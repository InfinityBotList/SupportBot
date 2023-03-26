module.exports = {
  name: "8ball",
  category: "Fun",
  disabled: false,
  description: "Ask the 8ball a question",
  aliases: [],
  permissions: [],

  run: async (message, args, client) => {
    let q = args.slice(0).join(" ");

    let res = [
      "It is certain.",
      "No doubt about it.",
      "No chance.",
      "Maybe, only time will tell.",
      "No way.",
      "Concentrate and try again.",
      "As I see it, yes",
      "Outlook good",
      "Most likely",
      "Better not tell you now",
      "My sources say yes",
      "Signs point to yes",
      "Yes definitely",
      "It is decidedly so",
      "As I see it, no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
    ];

    if (!q) {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("ERROR: Missing params")
        .setColor("RED")
        .setThumbnail(client.logo)
        .setDescription("Please provide a question for the 8ball")
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return message.reply({ embeds: [embed] });
    }

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Magic 8Ball")
      .setColor(client.color)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/653733403841134600/1088241600133607515/ezgifcom-gif-maker_8.7b86d9b5eefc.gif"
      )
      .addFields(
        {
          name: "You Asked",
          value: `${q}`,
        },
        {
          name: "8Ball Says",
          value: `${res[Math.floor(Math.random() * res.length)]}`,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return message.reply({ embeds: [embed] });
  },
};
