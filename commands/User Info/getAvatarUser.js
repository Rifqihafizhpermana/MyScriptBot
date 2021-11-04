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
        if (!args[0]) return message.reply("**Please mention a member first!**")
        const getTarget = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())
        if (!getTarget) return message.reply("**The user you provided is not valid in this guild, try using User ID or User Name or try to mention the member!**")

        const msgEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('RANDOM')
            .setDescription(`Avatar ${getTarget.user.tag}`)        
            .setFooter(`Request By ${message.author.tag}`)
            .setImage(`${getTarget.user.avatar}`)
            .setTimestamp()
            .setTitle(`Get Avatar User ${getTarget.user.tag}`)
        message.reply({ embeds: [msgEmbed] });

    },
};
