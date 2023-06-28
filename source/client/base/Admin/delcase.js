const CASES = require("@handlers/mongo/schemas/userCases");

module.exports = {
  name: "delcase",
  category: "Admin",
  disabled: false,
  description: "Delete a specific case for a user",
  aliases: [],
  permissions: ["BOT_ADMIN"],

  run: async (message, args, client) => {
    let member = message.mentions.members.first();
    let caseNum = args.slice(1).join(" ");

    let no_member = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No user provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription("Please mention the user you want to check a case for")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    let no_case = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No case number provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription(
        "Please provide a valid case number (ex: ``<<delcase @Toxic Dev 2``)"
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member) return message.reply({ embeds: [no_member] });
    if (!caseNum) return message.reply({ embeds: [no_case] });

    CASES.findOneAndDelete(
      {
        user: member.user.id,
        guild: message.guild.id,
        case: caseNum,
      },
      (err, res) => {
        if (!res) {
          let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: No cases found")
            .setColor("RED")
            .setThumbnail(client.logo)
            .setDescription(
              "No case with that number exists for this user in this guild!"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

          return message.reply({ embeds: [embed] });
        } else {
          let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("SUCCESS: Case deleted!")
            .setColor("RED")
            .setThumbnail(client.logo)
            .setDescription(
              "Case has been deleted, this may take a minute to reflect in our Database!"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

          return message.reply({ embeds: [embed] });
        }
      }
    );
  },
};
