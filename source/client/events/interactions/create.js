module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    client.interaction = interaction;

    const command = client.slash.get(interaction.commandName);

    if (!command) return interaction.reply({ content: "Command not found!" });

    if (
      command.userPerms.includes("BOT_ADMIN") &&
      !client.perms.Admins.includes(interaction.user.id)
    ) {
      const user_perms = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("ERROR: Invalid Permissions")
        .setColor(client.color)
        .setThumbnail(client.logo)
        .setDescription(
          "Hold up chief, you do not have the necessary permissions"
        )
        .addFields({
          name: "Required Permissions",
          value: `${command.userPerms}`,
          inline: true,
        })
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return interaction.reply({
        embeds: [user_perms],
        ephemeral: true,
      });
    }

    if (
      command.basePerms &&
      !interaction.member.permissions.has(command.basePerms)
    ) {
      const base_perms = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("ERROR: Invalid Permissions")
        .setColor(client.color)
        .setThumbnail(client.logo)
        .setDescription(
          "Hold up chief, you do not have the necessary permissions"
        )
        .addFields({
          name: "Required Permissions",
          value: `${command.basePerms}`,
          inline: true,
        })
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return interaction.reply({
        embeds: [base_perms],
        ephemeral: true,
      });
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);

        option.options?.forEach((x) => {
          if (x.value) args.push(option.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      command.run(client, interaction, args);
    } catch (e) {
      const cmd_error = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("FATAL: Internal Error")
        .setColor(client.color)
        .setThumbnail(client.logo)
        .setDescription("Whoops, something isn't right here")
        .addFields({
          name: "Error Message",
          value: `${e.message}`,
          inline: true,
        })
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      await interaction.reply({
        embeds: [cmd_error],
        ephemeral: true,
      });

      return client.logger(`Internal Error: ${e.stack}`, {
        header: "SLASH COMMANDS ERROR",
        type: "error",
      });
    }
  },
};
