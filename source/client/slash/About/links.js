module.exports = {
    name: "links",
    category: "About",
    description: "Display a list of our Website Links",
    userPerms: ["none"],
    basePerms: ["none"],

    run: async (client, interaction) => {
        let btn = new client.Infinity_Gateway.MessageButton()
            .setLabel("Website")
            .setURL("https://infinitybots.gg")
            .setStyle(5);

        let btn2 = new client.Infinity_Gateway.MessageButton()
            .setLabel("Discord")
            .setURL("https://infinitybots.gg/discord")
            .setStyle(5);

        let btn3 = new client.Infinity_Gateway.MessageButton()
            .setLabel("Documentation")
            .setURL("https://docs.botlist.site")
            .setStyle(5);

        let ButtonsRow =
            new client.Infinity_Gateway.MessageActionRow().addComponents(
                btn,
                btn2,
                btn3
            );

        const embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Some Useful Links")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription("Below is a list of some of our links")
            .addFields(
                {
                    name: "Website",
                    value: "[infinitybots.gg](https://infinitybots.gg)",
                    inline: true,
                },
                {
                    name: "Discord",
                    value: "[infinitybots.gg/discord](https://infinitybots.gg/discord)",
                    inline: true,
                },
                {
                    name: "Documentation",
                    value: "[docs.botlist.site](https://docs.botlist.site)",
                    inline: true,
                },
                {
                    name: "Blog",
                    value: "[infinitybots.gg/blog](https://infinitybots.gg/blog)",
                    inline: true,
                },
                {
                    name: "Beta",
                    value: "[reedwhisker.infinitybots.gg](https://reedwhisker.infinitybots.gg)",
                    inline: true,
                },
                {
                    name: "Support",
                    value: "[infinitybots.gg/help](https://infinitybots.gg/help)",
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return interaction.reply({ embeds: [embed], components: [ButtonsRow] });
    },
};
