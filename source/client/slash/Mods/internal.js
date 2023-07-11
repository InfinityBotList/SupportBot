const CASES = require("@handlers/mongo/schemas/internalCases");
const moment = require("moment");

module.exports = {
    name: "internal",
    category: "Mods",
    description: "Execute or view a Staff Case/Warning(s)",
    userPerms: ["BOT_MANAGERS"],
    basePerms: ["none"],
    options: [
      {
        name: "view",
        description: "View a Staff Case",
        type: "SUB_COMMAND",
        options: [
          {
            name: "user",
            description: "The staff member it affected",
            required: true,
            type: 6
          },
          {
            name: "case_number",
            description: "The case number you want to view",
            required: true,
            type: "NUMBER"
          }
        ]
      },
      {
        name: "create",
        description: "Create a new Staff Case (warn etc)",
        type: "SUB_COMMAND",
        options: [
          {
            name: "user",
            description: "Staff member to create the case for",
            required: true,
            type: 6
          },
          {
            name: "reason",
            description: "Reason for warning the staff member",
            required: true,
            type: "STRING"
          },
          {
            name: "duration",
            description: "Duration of the warning (3, 6 or 12 months)",
            required: true,
            type: "STRING",
            choices: [
              {
                name: "3 Months",
                value: "3 Months"
              },
              {
                name: "6 Months",
                value: "6 Months"
              },
              {
                name: "12 Months",
                value: "12 Months"
              }
            ]
          },
          {
            name: "level",
            description: "Severity of infraction",
            required: true,
            type: "STRING",
            choices: [
              {
                name: "Minor",
                value: "Minor Infraction"
              },
              {
                name: "Serious",
                value: "Serious Infraction"
              },
              {
                name: "Major",
                value: "Major Infraction"
              }
            ]
          }
        ]
      },
      {
        name: "delete",
        description: "Delete a staff members warning",
        type: "SUB_COMMAND",
        options: [
          {
            name: "user",
            description: "User to delete the case for",
            required: true,
            type: 6
          },
          {
            name: "case_number",
            description: "The case number you want to delete",
            required: true,
            type: "NUMBER"
          },
          {
            name: "reason",
            description: "The reason you are deleting this case",
            required: true,
            type: "STRING"
          }
        ]
      }
    ],
  
    run: async (client, interaction) => {

      switch (interaction.options.getSubcommand()) {

        /**
         * View a infraction by case number
         */
        case 'view':

        let u = await interaction.options.getMember("user");
        let case_num1 = await interaction.options.getNumber("case_number");
        
        if (!interaction.guild.id === '870950609291972618') return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Invalid Guild')
             .setColor("RED")
             .setThumbnail(client.logo)
             .setDescription("Hold up chief, this command should be executed in the Infinity Bot List Staff Server!")
             .setTimestamp()
             .setFooter({ 
               text: client.footer, 
               iconURL: client.logo 
             })
        ]})

        let c = await CASES.findOne({
          user: u.user.id,
          case: case_num1
        })

        if (!c) return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Unable to identify case(s)')
             .setColor('RED')
             .setThumbnail(client.logo)
             .setDescription('It looks like this staff member has no active cases or that case does not exist')
             .setTimestamp()
             .setFooter({
              text: client.footer,
              iconURL: client.logo
             })
        ]})

        return interaction.reply({ embeds: [
          new client.Infinity_Gateway.MessageEmbed()
           .setTitle(`Case Information`)
           .setColor(client.color)
           .setThumbnail(client.logo)
           .setDescription(`Case information for ${u.user.username}`)
           .addFields(
            {
              name: 'Case Number',
              value: `${c.case}`
            },
            {
              name: 'Moderator',
              value: `${client.users.cache.get(c.moderator).username}`
            },
            {
              name: 'Duration',
              value: `${c.duration}`
            },
            {
              name: 'Created',
              value: `${c.start}`,
            },
            {
              name: 'Expires',
              value: `${c.end}`
            },
            {
              name: 'Level',
              value: `${c.level}`
            },
            {
              name: 'Reason',
              value: `${c.reason}`
            }
           )
           .setTimestamp()
           .setFooter({
            text: client.footer,
            iconURL: client.logo
           })
        ]})

        break;

        /**
         * Create a new infraction
         */
        case 'create':

         let staff_u = await interaction.options.getMember("user");
         let action_r = await interaction.options.getString("reason");
         let action_d = await interaction.options.get("duration");
         let audit_logs = await interaction.guild.channels.cache.find((c) => c.id === "1123655378702438400");
         let action_l = await interaction.options.get('level');

         let s_cases = await CASES.find({
          user: staff_u.user.id,
          guild: interaction.guild.id 
         });

         const case_num = await s_cases.length + 1;

         if (!interaction.guild.id === '870950609291972618') return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Invalid Guild')
             .setColor("RED")
             .setThumbnail(client.logo)
             .setDescription("Hold up chief, this command should be executed in the Infinity Bot List Staff Server!")
             .setTimestamp()
             .setFooter({ 
               text: client.footer, 
               iconURL: client.logo 
             })
        ]})

         if (staff_u == interaction.member) return interaction.reply({ embeds: [
          new client.Infinity_Gateway.MessageEmbed()
           .setTitle('ERROR: Invalid User')
           .setColor('RED')
           .setThumbnail(client.logo)
           .setDescription('You can not warn yourself noob, please mention someone else')
           .setTimestamp()
           .setFooter({
            text: client.footer,
            iconURL: client.logo
           })
         ]})

         let date = moment(interaction.createdAt).format("MM-DD-YYYY");
          
          let end;

          if (action_d.value === '3 Months') {
            end = moment(interaction.createdAt).add(3, 'months').format("MM-DD-YYYY")
          } else if (action_d.value === '6 Months') {
            end = moment(interaction.createdAt).add(6, 'months').format("MM-DD-YYYY")
          } else {
            end = moment(interaction.createdAt).add(12, 'months').format("MM-DD-YYYY")
          }

         let new_case = new CASES({
          user: staff_u.user.id,
          guild: interaction.guild.id,
          action: 's_warn',
          reason: action_r,
          moderator: interaction.member.user.id,
          case: case_num,
          duration: action_d.value,
          time: moment(interaction.createdAt).format("MM/DD/YYYY HH:mm:ss A"),
          level: action_l.value,
          start: date,
          end: end
         })

         await new_case.save().then(async () => {

          await audit_logs.send({
            content: `<@!${staff_u.user.id}>`, 
            embeds: [
             new client.Infinity_Gateway.MessageEmbed()
              .setTitle(`New Staff Infraction`)
              .setColor(client.color)
              .setThumbnail(client.logo)
              .setDescription(`${staff_u.user.username} has received a new infraction`)
              .addFields(
                {
                  name: 'Case Number',
                  value: `#${case_num}`,
                  inline: false
                },
                {
                  name: 'Warned By',
                  value: `${interaction.member.user.username}`,
                  inline: false
                },
                {
                  name: 'Duration',
                  value: `${action_d.value}`,
                  inline: false
                },
                {
                  name: "Start Date",
                  value: `${date}`,
                  inline: false
                },
                {
                  name: "End Date",
                  value: `${end}`,
                  inline: false
                },
                {
                  name: 'Infraction Level',
                  value: `${action_l.value}`,
                  inline: false
                },
                {
                  name: 'Reason',
                  value: `${action_r}`,
                  inline: false
                }, 
              )
              .setTimestamp()
              .setFooter({
                text: client.footer,
                iconURL: client.logo
              })
            ]
          })

          return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('Action Success')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('Staff member has been warned successfully!')
             .setTimestamp()
             .setFooter({
              text: client.footer,
              iconURL: client.logo
            })
          ]})

         }).catch((error) => {


          return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Mongo_Failure')
             .setColor('RED')
             .setThumbnail(client.logo)
             .setDescription('Failed to save new infraction')
             .addFields(
               {
                name: 'Reason',
                value: `${error}`,
                inline: false
               }
             )
             .setTimestamp()
             .setFooter({
              text: client.footer,
              iconURL: client.logo
            })
          ]})
         })

         break;

         /**
          * Delete a infraction
          */
         case 'delete':

         let staff_u2 = await interaction.options.getMember("user");
         let action_reason = await interaction.options.getString("reason");
         let action_case = await interaction.options.getNumber("case_number");
         let staff_logs = await interaction.guild.channels.cache.find((c) => c.id === "1128467438716067850");

         if (!interaction.guild.id === '870950609291972618') return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Invalid Guild')
             .setColor("RED")
             .setThumbnail(client.logo)
             .setDescription("Hold up chief, this command should be executed in the Infinity Bot List Staff Server!")
             .setTimestamp()
             .setFooter({ 
               text: client.footer, 
               iconURL: client.logo 
             })
        ]})

         /**if (staff_u2 == interaction.member) return interaction.reply({ embeds: [
          new client.Infinity_Gateway.MessageEmbed()
           .setTitle('ERROR: Invalid User')
           .setColor('RED')
           .setThumbnail(client.logo)
           .setDescription('You can not delete your own infraction')
           .setTimestamp()
           .setFooter({
            text: client.footer,
            iconURL: client.logo
           })
         ]})**/

         if (!client.perms.Admins.includes(interaction.member.user.id)) return interaction.reply({ embeds: [
           new client.Infinity_Gateway.MessageEmbed()
            .setTitle('ERROR: Invalid Permissions')
            .setColor('RED')
            .setThumbnail(client.logo)
            .setDescription('Sorry, only the Infinity Owners can delete a infraction to prevent abuse')
            .setTimestamp()
            .setFooter({
              text: client.footer,
              iconURL: client.logo
            })
         ]})

         await CASES.findOneAndDelete({
          user: staff_u2.user.id,
          case: action_case
         }, async (err, res) => {
          
          if (!res) {

            return interaction.reply({ embeds: [
               new client.Infinity_Gateway.MessageEmbed()
                .setTitle('ERROR: No case(s) found')
                .setColor('RED')
                .setThumbnail(client.logo)
                .setDescription('This user has no infractions or the case number does not exist')
                .setTimestamp()
                .setFooter({
                  text: client.footer,
                  iconURL: client.logo
                })
            ]})

          } else {

            await staff_logs.send({ embeds: [
              new client.Infinity_Gateway.MessageEmbed()
               .setTitle('Case Deleted')
               .setColor("RED")
               .setThumbnail(client.logo)
               .setDescription(`${interaction.member.user.username} has deleted a case`)
               .addFields(
                {
                  name: 'Case User',
                  value: `${staff_u2.user.username}`,
                  inline: false
                },
                {
                  name: 'Case Number',
                  value: `${action_case}`,
                  inline: false
                },
                {
                  name: 'Reason for Deletion',
                  value: `${action_reason}`,
                  inline: false
                }
               )
            ]})

            return interaction.reply({ embeds: [
              new client.Infinity_Gateway.MessageEmbed()
               .setTitle('SUCCESS: Case deleted!')
               .setColor(client.color)
               .setThumbnail(client.logo)
               .setDescription('Case has been deleted, this may take  a minute to reflect in our database')
               .setTimestamp()
               .setFooter({
                text: client.footer,
                iconURL: client.logo
               })
            ]})
          }
         })

         break;

        default:

        return interaction.reply({ embeds: [
            new client.Infinity_Gateway.MessageEmbed()
             .setTitle('ERROR: Invalid Command Usage')
             .setColor("RED")
             .setThumbnail(client.logo)
             .setDescription("Hold up chief, you failed to provide any interaction arguments")
             .setTimestamp()
             .setFooter({ 
               text: client.footer, 
               iconURL: client.logo 
             })
        ]})
      }
    },
  };
  