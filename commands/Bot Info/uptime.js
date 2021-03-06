const { Message, Client } = require("discord.js");
const Discord = require('discord.js')
const os = require('os')


module.exports = {
    name: "uptime",
    aliases: ['ut'],
    description: "Show a uptime bot",
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 1,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let msgUptime = new Discord.MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('RED')      
            .addField(
                'š My Uptime:',
                `ā \`${days}\` **Day**, \`${hours}\` **Hours**, \`${minutes}\` **Minute**, \`${seconds}\` **Second Uptime**\nš Memory Usage \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` **MB**\nš» Operations System ${os.type()}`
            )
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()

        let upEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`ā - My uptime is \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds\n ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`)

        message.reply({ embeds: [msgUptime] })
    },
};
