module.exports = {
    name: "kick",
    category: "Mods",
    disabled: false,
    description: "Kick a member from the server",
    aliases: [],
    permissions: [
        "KICK_MEMBERS"
    ],

    run: async(message, args, client) => {
        
        let user = message.mentions.members.first();

        let NoUser = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ERROR: No user provided")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription("Okay chief listen, i can not kick the air! Mention a user to kick!")
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

        let NoReason = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ERROR: No reason provided")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription("Okay chief listen, you need to provide a reason")
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })
        
        let KickFail = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ERROR: Unable to kick user")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription("Hold up, seems i am unable to kick that user.. This is usually due to them having higher permissions!")
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

        let KickFail2 = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("ERROR: Why would you even!")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription("You can not just kick yourself noob")
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

        if (!user) return message.channel.send({ embeds: [NoUser] });

        let reason = args.slice(1).join(" ");

        if (!reason) return message.channel.send({ embeds: [NoReason] }); 

        if (user.id == message.author.id) return message.channel.send({ embeds: [KickFail2] });

        if (!user.kickable) return message.channel.send({ embeds: [KickFail] });

        if (user) {

                let embed = new client.Infinity_Gateway.MessageEmbed()
                  .setTitle("SUCCESS: User Kicked!")
                  .setColor(client.color)
                  .setThumbnail(client.logo)
                  .setDescription('Whoops, someone messed up!!')
                  .addFields(
                    {
                        name: "User",
                        value: `${user.user.username}#${user.user.discriminator}`,
                        inline: true
                    },
                    {
                        name: "Reason",
                        value: `${reason}`,
                        inline: true
                    },
                    {
                        name: "Moderator",
                        value: `${message.author.tag}`,
                        inline: true
                    }
                  )
                  .setTimestamp()
                  .setFooter({ text: client.footer, iconURL: client.logo });

                  await message.channel.send({ embeds: [embed] })

                  return user.kick(`${reason}`);
        }
    }
}