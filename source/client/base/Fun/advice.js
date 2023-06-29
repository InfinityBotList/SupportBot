const url = require("snekfetch");

module.exports = {
    name: "advice",
    category: "Fun",
    disabled: false,
    description: "Get some advice",
    aliases: [],
    permissions: [],

    run: async(message, args, client) => {
        const { body } = await url.get("http://api.adviceslip.com/advice");

        let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Useful Advice")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription(`${JSON.parse(body.toString()).slip.advice}`)
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return message.reply({ embeds: [embed] });
    },
};