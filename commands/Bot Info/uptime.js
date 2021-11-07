const { Message, Client } = require("discord.js");
const Discord = require('discord.js')

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

        let upEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`✅ - My uptime is \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds,`)

        message.reply({ embeds: [upEmbed] })
    },
};
