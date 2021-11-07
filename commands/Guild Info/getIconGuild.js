const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "geticondiscord",
    aliases: ['geticon', 'gi'],
    description: "Get Icon Guild Discord",
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
            .setDescription(`Icon Discord ${message.guild.name}`)        
            .setFooter(`Request By ${message.author.tag}`)
            .setImage(`${message.guild.iconURL({ size: 1024 })}`)
            .setTimestamp()
            .setTitle(`Get Icon Discord Server ${message.guild.name}`)                
        message.reply({ embeds: [msgEmbed] });
    },
};
