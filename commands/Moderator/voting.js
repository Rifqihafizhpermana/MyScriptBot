const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "voting",
    aliases: ['vt'],
    UserPerms: ["ADMINISTRATOR"],
    BotPerms: ["ADMINISTRATOR"],
    cooldown: 30,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.bot) return;
        let getMsg = message.content.split(" ").slice(1).join(" ");
        message.delete();

        if (!getMsg) return message.reply("**Please enter a message to vote**");

        const msgEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setFields(
                { name: `${getMsg}`, value: '<:emoji_3:905222293049978911> For Yes, <:emoji_4:905224649204461679> For No' }
            )
            .setFooter(`Vote Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle('Vote System <a:ownzex_anounce:905234803668942868>')
                
        message.channel.send({ embeds: [msgEmbed] }).then(msg => {
            msg.react('<:emoji_3:905222293049978911>');
            msg.react('<:emoji_4:905224649204461679>')
        });

    },
};
