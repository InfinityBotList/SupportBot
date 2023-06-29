const url = require("snekfetch");

module.exports = {
    name: "advice",
    category: "Fun",
    description: "Get some advice",
    userPerms: ["none"],
    basePerms: ["none"],

    run: async(client, interaction) => {
        const { body } = await url.get("http://api.adviceslip.com/advice");

        const embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Useful Advice")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription(`${JSON.parse(body.toString()).slip.advice}`)
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return interaction.reply({ embeds: [embed] });
    },
};