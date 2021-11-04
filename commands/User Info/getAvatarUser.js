const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "getavatar",
    aliases: ['getav', 'av'],
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 5,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const msgEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('RANDOM')
            .setDescription()        
            .setFields(
                { name: '', value: '' },
                { name: '', value: '' }
            )
            .setFooter()
            .setImage()
            .setThumbnail()
            .setTimestamp()
            .setTitle()
        message.reply({ embeds: [msgEmbed] });

    },
};
