module.exports = {
    name: "coinflip",
    category: "Fun",
    description: "Flip a coin! Can you win?",
    userPerms: ["none"],
    basePerms: ["none"],
    options: [{
        name: "choice",
        description: "Heads or Tails",
        type: 3,
        required: true,
    }, ],

    run: async(client, interaction) => {
        var options = ["heads", "tails"];
        var choice = await interaction.options.getString("choice");

        var result = options[Math.floor(Math.random() * options.length)];

        let status;

        if (result !== choice.toLowerCase()) status = "You loose noob";
        else status = "You win! GG";

        let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Coin Flip Results")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .addFields({
                name: "You Chose",
                value: `${choice.toLowerCase()}`,
                inline: true,
            }, {
                name: "Coin Landed On",
                value: `${result}`,
                inline: true,
            }, {
                name: "Results",
                value: `${status}`,
                inline: true,
            })
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return interaction.reply({ embeds: [embed] });
    },
};