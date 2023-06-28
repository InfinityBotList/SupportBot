module.exports = {
  name: "ginfo",
  category: "Admin",
  disabled: false,
  description: "Post the info channel embed",
  aliases: [],
  permissions: ["BOT_ADMIN"],

  run: async (message, args, client) => {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Welcome to Infinity Bot List")
      .setColor(client.color)
      .setThumbnail(client.glogo2)
      .setDescription(
        "Search our vast list of bots for an exciting start to your Discord Server. Filter by name, category, tags and description to find a bot that suits your needs!"
      )
      .addFields(
        {
          name: "About Us",
          value:
            "➱ [Website](https://infinitybots.gg/about/team)\n➱[Development](https://infinitydev.team/)",
          inline: true,
        },
        {
          name: "Add Something",
          value:
            "➱ [New Bot](https://infinitybots.gg/bots/add)\n➱ [New Pack](https://infinitybots.gg/packs/add)\n➱ [New Team](https://infinitybots.gg/teams/add)",
          inline: true,
        },
        {
          name: "Support Section",
          value:
            "➱ [Support Panel](https://infinitybots.gg/help)\n➱ [Our Blog](https://infinitybots.gg/blog)",
          inline: true,
        },
        {
          name: "Status and Stats",
          value:
            "➱ [Website Status](https://status.botlist.site/)\n➱ [Website Stats]( https://infinitybots.gg/about/stats)",
          inline: true,
        },
        {
          name: "Website Domains",
          value:
            "➱ [botlist.site](https://botlist.site/)\n➱ [infinitybots.gg](https://infinitybots.gg/)",
          inline: true,
        },
        {
          name: "Documentation",
          value:
            "➱ [User Guide](https://docs.botlist.site)\n➱ [API Guide](https://api.infinitybots.gg/docs)",
          inline: true,
        },
        {
          name: "Infinity Programs",
          value:
            "➱ [Partners](https://infinitybots.gg/about/partners)\n➱ [Certification](https://infinitybots.gg/help/programs/certification)",
          inline: true,
        },
        {
          name: "Discord Invite",
          value:
            "➱ [Custom](https://infinitybots.gg/redirect/discord)\n➱ [Basic](https://discord.gg/infinity-bots-758641373074423808)",
          inline: true,
        },
        {
          name: "Applications",
          value:
            "➱ [Staff App](https://infinitybots.gg/apps/staff)\n➱ [Dev App](https://infinitybots.gg/apps/dev)\n➱ [Cert App](https://infinitybots.gg/apps/certification)",
          inline: true,
        },
        {
          name: "Official Twitter(s)",
          value:
            "➱ [@InfinityBotList](https://twitter.com/InfinityBotList)\n➱ [@HeyInfinityBots](https://twitter.com/HeyInfinityBots)\n➱ [@InfinityDevsLLC](https://twitter.com/InfinityDevsLLC)",
          inline: true,
        },
        {
          name: "Other Socials",
          value:
            "➱ [YouTube](https://www.youtube.com/@InfinityBotList)\n➱ [Truth Social](https://truthsocial.com/@InfinityBots)\n➱ [Medium](https://medium.com/@infinitybotlist)\n➱ [Instagram](https://www.instagram.com/infinitybotlist/)\n➱ [TikTok](https://www.tiktok.com/@infinitybotlist)",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.glogo2 });

    return message.channel.send({
      embeds: [embed],
    });
  },
};
