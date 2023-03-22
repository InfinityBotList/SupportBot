module.exports = {
    name: "grules",
    category: "Admin",
    disabled: false,
    description: "Post the rules channel embed",
    aliases: [],
    permissions: [
      "ADMINISTRATOR"
    ],

    run: async(message, args, client) => {
      

        const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("Server Rules")
          .setColor(client.color)
          .setThumbnail(client.glogo2)
          .setDescription("General Rules that all of our Server Members are expected to follow at all times with no exceptions!")
          .addFields(
            {
              name: "∞ Be friendly and respectful to all server members",
              value: 'This is meant to be a welcoming and supportive community for all discord users.  Please treat others how you want to be treated regardless of whatever issues you may or may not have with them do not bring your drama here. ',
            },
            {
                name: "∞ Follow the Rules, Guidelines and Terms",
                value: 'Infinity bot list has its own legal documentation such as a Privacy Policy and Terms of Service that should be respected at all times. You should also respect the Discord Terms of Service and Community Guidelines.',
            },
            {
                name: "∞ No harassment, hate speech or bullying of any kind",
                value: 'As stated above we are a open and welcoming community for all discord users and developers alike. Disrespecting or targeting somebody based on their race, religion or programming language of choice will not be tolerated. ',

            },
            {
                name: '∞ No self advertising or promotions',
                value: 'We do not allow any kind of advertising here from anyone who is not a designated partner or certified developer this includes sharing YouTube videos and Live stream links. You are welcome to share any media in <#767485273612877876> so long as it meets this requirement and serves some kind of purpose to the channel (art/design, memes etc)',
            },
            {
                name: '∞ Absolutely no spam',
                value: 'This includes spamming user pings/mentions, emojis, characters and chained messages.'
            },
            {
                name: '∞ Be especially courteous and respectful to new members and beginners',
                value: 'With regards to discord development overall. We’re here to help and support them where-ever and however we can. '
            },
            {
                name: '∞ Do not spoon feed developers',
                value: 'Regardless of their experience level. Approach problems that users are having with an open mind and the objective of helping them learn how the process works and how they can address their issues. Telling them to “google it” or simply giving them a working example doesn’t help anyone learn anything. '
            },
            {
                name: '∞ Our primary language is English',
                value: 'Any and all conversations inside of the <#758641373074423811> channel are expected to follow this rule. Chat in any other language can be carried out in <#979485256170217542> '
            },
            {
                name: '∞ Do not evade bans or punishments',
                value: 'Using alternate accounts or abusing the discord services to bypass any bans or moderator actions is strictly prohibited. Any ban from our Discord Server will result in a ban from our website and can be appealed [here](https://appeals.botlist.site/)'
            },
            {
                name: '∞ No NSFW content outside of designated channels',
                value: 'This includes any content suggesting, hinting, encouraging or posting or said content. This type of content should be posted inside of the #deleted-channel and #deleted-channel channels.'
            },
            {
                name: '∞ Do not backseat moderate',
                value: ' If you are not a member of our staff team, moderator or admin. Then you have no reason to be telling our users how they should conduct themselves. Reminding them about rules is fine but aside from that please open a ticket and report them so we can handle it. '
            },
            {
                name: '∞ No shock disturbing or seizure enducing content',
                value: 'This includes images or videos of gore or bodily fluids and any images or gifs that provide an excessive amount of flashing colours.'
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.glogo2 });

        const embed2 = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("Bot Rules")
          .setColor(client.color)
          .setThumbnail(client.glogo2)
          .setDescription("All listed bots are expected to abide by these rules at all times with no exceptions!")
          .addFields(
            {
              name: "∞ Basic Requirements",
              value: 'All bots should Abide by the Infinity Bots Terms of Service, Discord’s Terms of Service, API rate limits and Developer terms. ',
            },
            {
              name: "∞ Bots that generate accounts/gifts from other services (uplay, spotify etc)",
              value: 'Aren\'t allowed on our bot list and will be denied without further review. Continuing to try and add your bot will result in a ban! ',
            },
            {
              name: " ∞ Your bot should be online, public and able to be invited during review.",
              value: 'If your bot is currently limited by Discords 100 server limit please wait until after verification to submit.',
            },
            {
              name: "∞ The main feature and majority of the base commands must work and function as intended.",
              value: 'Having errors in your code is expected but it shouldn’t be so full of bugs that it takes away from the bots usability.',
            },
            {
              name: "∞ Keep NSFW content (including, but not limited to:",
              value: 'Links that source to pornographic material) should be available only inside of NSFW channels',
            },
            {
              name: "∞ May not include any seizure-inducing content (gifs, emojis)",
              value: 'This includes but is not limited to: an excessive amount of flashy colours',
            },
            {
              name: " ∞ Commands must only require permissions that the command being run needs.",
              value: 'For example the kick command should only require the kick permission as it\'s required to be used. Bots cannot require the administrator or mention everyone permission for it to work.',
            },
            {
              name: "∞ Must not be an unmodified instance or fork",
              value: 'Of another bot and must have a considerable amount of modification and original credits in place.',
            },
            {
              name: " ∞ Must have a clear and obvious point of entry (e.g. a working help command)",
              value: 'As well as a minimum of 7 working commands. Excluding bots who serve a designated purpose (ie: Ticket Bots)',
            },
            {
              name: " ∞ Bots who may be seen as “in competition” with infinity are fine (such as management bots for other bot lists). ",
              value: 'If you are another bot list owner and want to list your management bots here feel free.',
            },
            {
              name: "∞ The term “loli” or any other term that refers to the sexualization of underage children",
              value: 'Cannot be used anywhere throughout your bot or bot page as this is specifically referencing underage women and is strictly forbidden. ',
            },
            {
              name: " ∞ Must not have the sole intent",
              value: 'Of impersonating other bots, advertising or mass messaging without consent from all parties involved',
            },
            {
              name: "∞  Must not reward users for voting for any other bot listed on the infinity bots website.",
              value: 'Rewarding users for voting for your own bot is fine but rewarding them for voting for a bot that is not yours is strictly forbidden.',
            },
            {
              name: "∞ Your bot must keep all owner commands locked to developers",
              value: 'For example: evals, status/presence commands and any other commands that may present vulnerabilities with your bot',
            },
            {
              name: " ∞ Bots with commands allowing a user to DM another user",
              value: 'Must either state the author or that it was anonymous; in addition to having a block or opt-out feature.',
            },
            {
              name: "∞ Bots that provide voting reminders",
              value: 'Must allow users to unsubscribe from them and must specify how to do so in the notification',
            },
            {
              name: "∞ Bots should not have a series of repeated commands.",
              value: 'Of course bots who have a designated purpose is fine but bots who just repeat the command over and over again with different ways of using them in hopes to get the bot approved will be denied.',
            },
            {
              name: " ∞  Any and all music bots. ",
              value: 'Music bots that allow playback through YouTube are classified as API Abuse/Pirating Music and will be denied verification from discord meaning you will not be able to grow your bot past 100 servers and you could face a copyright strike. We will no longer deny your bot for this but please use YouTube at your own discretion',
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.glogo2 });

        const embed3 = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("Page Rules")
          .setColor(client.color)
          .setThumbnail(client.glogo2)
          .setDescription("On your bot page you are not allowed to:")
          .addFields(
            {
              name: "∞ Include spam/junk",
              value: 'Or completely irrelevant/nonsensical or invisible characters or phrases in your bot description to intentionally use up our built in character limit.',
            },
            {
              name: "∞ Mention NSFW or include any NSFW content",
              value: 'On the bot page, in the avatar or anywhere in the long description unless the bot specifically has our NSFW Flag.',
            },
            {
              name: "∞ Use your page maliciously against users",
              value: 'By either providing or linking to malicious or otherwise deceptive or illegal content.',
            },
            {
              name: "∞ Block any essential features",
              value: 'This includes buttons, widgets, copyrights and official advertisements',
            },
            {
              name: "∞ Use any of the provided buttons to link to unrelated content",
              value: 'Such as any attempted XSS attacks, alert scripts or third party ads and scams.',
            },
            {
              name: "∞ List the incorrect prefix on your bot page or a prefix that is irrelevant to your bot.",
              value: 'We can not use a bot if we do not know how to access it. This will result in us possibly asking you to change your prefix.',
            },
            {
              name: "∞ Use Alternate Accounts to bypass our voting limits or abuse our system/api",
              value: 'For a increased vote count, this will result in a vote ban for the bot and/or user.',
            },
            {
              name: "∞ Include any third party advertisements or links to third party services.",
              value: 'Adding bot widgets for other bot lists and links to vote etc is fine but the usage of third party ad services such as google ads on your bot page is strictly prohibited as this is profiting off our user base.',
            },
            {
              name: "∞ If your bot or bot page is found to violate our terms of service, privacy policy or use license",
              value: 'In any way your page may be permanently terminated or put back into a pending state.',
            },
            {
              name: "∞ All bot pages should include",
              value: 'A SFW and descriptive long description with basic command usage, examples and information, we enforce character limits for a reason your bot is not going to get attention if you don’t put in the effort to make your page look nice.',
            },
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.glogo2 });

        const embed4 = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("Server Policies")
          .setColor(client.color)
          .setThumbnail(client.glogo2)
          .setDescription("We are, first and foremost, a community. Infinity Bots has many features: partnership, certification, verification, and of course most importantly: Text and Voice chat. You should treat this server like you would any other Bot List or general discord community.")
          .addFields(
            {
              name: "∞ Infinity Bots has many features including:",
              value: 'Partnership, certification, verification, and of course most importantly Text and Voice chat.',
            },
            {
              name: "∞ General Community Respect is required",
              value: 'You should treat this server like you would any other Bot List or general discord community.',
            },
            {
              name: "∞ The Management Teams have final authority on all server and website-related decisions, including, but not limited to:",
              value: '`acceptable content, membership, moderator actions, bans, mutes, etc.` Their word is final, without further review. Management has wide-sweeping authority and the responsibility that comes with it.',
            },
            {
              name: "∞ The Website Mods have final authority on all bot-related decisions, including, but not limited to:",
              value: '`approval, denial, mute, kick, ban, etc.` Their word is final, without further review',
            },
            {
              name: "∞ All Staff Members have delegated authority to mute, ban any Discord user.",
              value: 'They exercise these permissions for the betterment of the server and to assist in keeping this place safe.',
            },
            {
              name: "∞ Permanent bans are decided on a case-by-case basis",
              value: 'Mainly if a user is found to be particularly toxic or disruptive, they may face a immediate permanent ban.',
            },
            {
              name: "∞ Members who have specific complaints about another member",
              value: 'Should DM a member of our staff team or open a ticket in our <#816156732929081366> channel as soon as possible.',
            },
            {
              name: "∞ The Management Teams and Website Mods balance the needs of the community",
              value: 'With the specific needs of an individual or bot. When in doubt, safety and security will supersede the short-term harm that may come to the server. ',
            },
            {
              name: "∞ If you’re being harassed by a specific member",
              value: 'Please let a staff member know. Even if they aren’t breaking a rule, if someone makes you uncomfortable, LET US KNOW!! We can’t help you if we don’t know. ',
            },
            {
              name: "∞ If a member of staff is making you uncomfortable",
              value: 'Please let one of the <@&815372072145649674> know as soon as possible so we can get this resolved.',
            },
            {
              name: "∞ While all Staff Members are entrusted with additional responsibility",
              value: 'They are not above the rules. If you see a staff member breaking the rules please let a member of the <@&911918122359988244> team know.'
            },
            {
              name: "∞  The Management and Staff Teams will Mute/Kick/Ban per discretion.",
              value: 'If you feel mistreated dm a <@&768197049978978321> or <@&872034848200597505> and we will resolve the issue.',
            },
            {
              name: "∞ All of our Channels will have:",
              value: 'Pinned messages or channel descriptions explaining what they are there for and how everything works. If you don\'t understand something, feel free to ask!',
            },
            {
              name: "∞ Your presence in this server implies that you accept and understand these rules and policies",
              value: 'Including all further changes. These changes might be done at any time without notice, it is your responsibility to check for them.',
            },
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.glogo2 });

          await message.channel.send({
            embeds: [embed]
          })

          await message.channel.send({
            embeds: [embed2]
          })

          await message.channel.send({
            embeds: [embed3]
          })

          return message.channel.send({ 
            embeds: [embed4] 
        });
    }
}