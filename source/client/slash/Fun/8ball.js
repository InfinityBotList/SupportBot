module.exports = {
  name: "8ball",
  category: "Fun",
  description: "Ask the 8ball a question",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
      name: "question",
      description: "What you want to ask the 8ball",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let q = interaction.options.getString("question");

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

    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Magic 8Ball")
      .setColor(client.color)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/653733403841134600/1088241600133607515/ezgifcom-gif-maker_8.7b86d9b5eefc.gif",
      )
      .addFields(
        {
          name: "You Asked",
          value: `${q}`,
          inline: false,
        },
        {
          name: "8ball Says",
          value: `${res[Math.floor(Math.random() * res.length)]}`,
          inline: false,
        },
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return interaction.reply({ embeds: [embed] });
  },
};
