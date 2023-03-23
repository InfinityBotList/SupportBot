const { InfinityClient } = require("@infinitybots/node-sdk");
const moment = require("moment");

module.exports = {
  name: "vote-check",
  category: "About",
  description: "Check if a user has voted for our main bot",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
      name: "user",
      description: "User to check vote status for",
      type: 6,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const ibl = new InfinityClient({
      auth: process.env.MAIN_BOT_API_KEY,
      botID: "815553000470478850",
    });

    let member = interaction.options.getMember("user");

    const voteStatus = await ibl.getUserVotes(member.user.id);

    let has;

    if (voteStatus.has_voted)
      has = `${member.user.username} has voted for our main bot recently!`;
    else
      has = `${member.user.username} has not voted for our main bot recently, they must be pretty lame!`;

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle(`Vote Status for: ${member.user.username}`)
      .setColor(client.color)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${has}`)
      .addFields(
        {
          name: "Voted Recently",
          value: `${voteStatus.has_voted}`,
          inline: true,
        },
        {
          name: "Last Vote Time",
          value: `${moment(voteStatus.last_vote_time)}`,
          inline: true,
        },
        {
          name: "Is Premium Bot",
          value: `${voteStatus.premium_bot}`,
          inline: true,
        },
        {
          name: "Provided User ID",
          value: `${voteStatus.user_id}`,
          inline: true,
        },
        {
          name: "Weekend Voting",
          value: `${voteStatus.vote_info.is_weekend ? "Enabled" : "Disabled"}`,
          inline: true,
        },
        {
          name: "Voting Time",
          value: `${voteStatus.vote_info.vote_time}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return interaction.reply({ embeds: [embed] });
  },
};
