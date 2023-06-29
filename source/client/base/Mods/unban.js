module.exports = {
    name: "unban",
    category: "Mods",
    disabled: false,
    description: "UnBan a member from the server",
    aliases: [],
    permissions: ["BAN_MEMBERS"],

    run: async(message, args, client) => {
        const id = args[0];

        let no_id = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: No user provided")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription("Please provide a user id to unban")
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        if (!id)
            return message.reply({
                embeds: [no_id],
            });

        await message.guild.members.unban(id);

        let unbanned = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("[MOD]: User Unbanned")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription(`<@!${id}> (${id}) has been unbanned`)
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return message.reply({
            embeds: [unbanned],
        });
    },
};