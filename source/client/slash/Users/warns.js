const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
    name: "warns",
    category: "Users",
    description: "Check a members warnings in this server",
    userPerms: ["none"],
    basePerms: ["none"],
    options: [
      {
        name: "user",
        description: "The user you want to check warnings for",
        type: 6,
        required: true,
      }
    ],
  
    run: async (client, interaction) => {

      let member = await interaction.options.getMember("user");
      let cases = await CASES.find({ user: member.user.id, guild: interaction.guild.id, action: "Warn" });

      if (!cases || cases == null || cases == undefined || cases.length == 0) {

        let embed = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ERROR: No cases found")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription("Whoops, looks like this user has not been warned here!")
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo });

         return interaction.reply({ embeds: [embed] });
      
      } else {

        let embed = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ACTION: Check User Warnings")
         .setColor(client.color)
         .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
         .setDescription("**NOTE** 3 Cases or more should result in a ban!")
         .addFields(
          {
            name: "User",
            value: `${member.user.tag}`,
            inline: true
          },
          {
            name: "Warnings",
            value: `${cases.length}`,
            inline: true
          }
         )
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

         return interaction.reply({ embeds: [embed] });
      }
    }
}