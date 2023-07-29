const url = require("snekfetch");

module.exports = {
  name: "coinflip",
  category: "Fun",
  disabled: true,
  description: "Flip a coin! Can you win?",
  aliases: [],
  permissions: [],

  run: async (message, args, client) => {
    var options = ["heads", "tails"];
    var choice = await args.slice(0).join(" ");

    let no_choice = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: Missing params")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("Please provide one of `heads` or `tails`")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!choice) return message.reply({ embeds: [no_choice] });

    let status;

    var result = options[Math.floor(Math.random() * options.length)];

    if (result !== choice.toLowerCase()) status = "You loose noob";
    else status = "You win! GG";

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Coin Flip Results")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .addFields(
        {
          name: "You Chose",
          value: `${choice.toLowerCase()}`,
          inline: true,
        },
        {
          name: "Coin Landed On",
          value: `${result}`,
          inline: true,
        },
        {
          name: "Results",
          value: `${status}`,
          inline: true,
        },
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return message.reply({ embeds: [embed] });
  },
};
