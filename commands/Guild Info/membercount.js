const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ['mc'],
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
        // Discord Merpati Roleplay has as many members of 201 members
        const msgEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setDescription(`Discord **${message.guild.name}** has as many members of **${message.guild.memberCount} Members**`)        
            .setFooter(`${message.guild.name} Member Count`)
            .setTimestamp()
            .setTitle(`${message.guild.name} - Member Count`)
                
        message.reply({ embeds: [msgEmbed] });

    },
};
