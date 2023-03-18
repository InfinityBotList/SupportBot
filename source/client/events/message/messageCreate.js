module.exports = {
    name : "messageCreate",

    async execute(message, client) {

        if (message.author.bot) return;
        if (!message.guild) return;

        let prefix = client.config.Client.Commands.prefix;

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

        if (message.content.match(mention)) {

            const embed = new client.Infinity_Gateway.MessageEmbed()
              .setTitle("Getting Started")
              .setColor(client.color)
              .setThumbnail(client.logo)
              .setDescription("Hey there, you seem a little lost!")
              .addFields(
                {
                    name: "My prefix is",
                    value: "``<<`` or ``/``",
                    inline: true
                },
                {
                    name: "My help command",
                    value: "``<<help`` or ``/help``",
                    inline: true
                }
              )
              .setTimestamp()
              .setFooter({ text: client.footer, iconURL: client.logo });

              return message.reply({ embeds: [embed] });
        }

        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const prefixRegex = new RegExp(
            `^(${escapeRegex(prefix)})\\s*`,
        );

        if (!prefixRegex.test(message.content)) return;
        
        const [matchedPrefix] = message.content.match(prefixRegex);
        
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;

        const embedBuilder = new client.Infinity_Gateway.MessageEmbed()
         .setTitle("Error: Command execution failed")
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

         if (command.args && !args.length) { 
            let reply = `You did not provide any arguements`

            if (command.usage) {
                reply += `\nUsage: \`${prefix}/${command.name} ${command.usage}\``
             }

             embedBuilder.setDescription(reply);

             return message.reply({ embeds: [ embedBuilder ]});
         }

         if (command.permissions && !message.member.permissions.has(command.permissions)) {
            embedBuilder.setDescription('You do not have the necessary permissions to execute this command')

            return message.reply({ embeds: [ embedBuilder ]});
         }

         if (command.disabled) {

            embedBuilder.setDescription('Whoops, this command is currently disabled. Please try again later!');

            return message.reply({ embeds: [ embedBuilder ]});
         }

         try {
            command.run(message, args, client, prefix);
         } catch (err) {
            return message.reply({ content: "Command execution failed!" });
         }
    }
}