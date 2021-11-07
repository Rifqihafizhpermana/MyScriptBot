const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "getbotlist",
    aliases: ['botlist', 'userbot', 'getbot'],
    description: "Get a bot member in a guild",
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 10,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const getBot = message.guild.members.cache.filter(m => m.user.bot).map(m => `<@${m.id}> [ ${m.user.username} ] **ID :** \`${m.id}\``);

        const msgEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor(`RED`)
            .setDescription(`${getBot.join('\n\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\n')}`)        
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle(`Total Bots : ${message.guild.members.cache.filter(member => member.user.bot).size}`)
                
        message.reply({ embeds: [msgEmbed] });

    },
};
