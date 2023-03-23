module.exports = {
  name: "rps",
  category: "Fun",
  description: "Rock paper scissors",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
      name: "choice",
      description: "Rock, Paper or Scissors",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    var options = ["rock", "paper", "scissors"];
    var choice = await interaction.options.getString("choice");

    var result = options[Math.floor(Math.random() * options.length)];

    let status;

    if (result !== choice.toLowerCase()) status = "You loose noob";
    else status = "You win! GG";

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("RPS Results")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .addFields(
        {
          name: "You Chose",
          value: `${choice.toLowerCase()}`,
          inline: true,
        },
        {
          name: "Enfinity Chose",
          value: `${result}`,
          inline: true,
        },
        {
          name: "Results",
          value: `${status}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return interaction.reply({ embeds: [embed] });
  },
};
