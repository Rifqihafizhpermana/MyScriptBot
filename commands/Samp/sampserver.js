const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')

module.exports = {
    name: "sampserver",
    aliases: ['samp'],
    description: "This command is in trouble",
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
        const getIP = args[0]
        const getPORT = args[1]

        if(!getIP) return message.reply('Masukkan ip server samp "oz!sampserver \`<IP>\` <PORT>"');
        if(!getPORT) return message.reply('Masukkan port server samp "oz!sampserver <IP> \`<PORT>\`"');

        const response = await fetch(`http://anabelle.bot.nu/api/sampquery?ip=${getIP}&port=${getPORT}`)
        const data = await response.json();
        const api = await data.response

        if (!api.hostname) {
            message.reply(`Server offline`)
        } else {
            const msgEmbed = new MessageEmbed()
                .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                .setColor('YELLOW')       
                .setFields(
                    { name: 'Gamemode', value: `${api.gamemode}` },
                    { name: 'Player Online', value: `${api.isPlayerOnline}/${api.maxplayers}` },
                    { name: 'Language', value: `${api.language}` },
                    { name: 'Website Server', value: `${api.rule.weburl}` },
                    { name: 'Server Versions', value: `${api.rule.version}` },
                )
                .setFooter(`${api.hostname} - Status Server`)
                .setTimestamp()
                .setTitle(`${api.hostname} - Status Server`)    
            message.reply({ embeds: [msgEmbed] });
        }

        // fetch(`http://anabelle.bot.nu/api/sampquery?ip=${getIP}&port=${getPORT}`)
        //     .then((res) => res.json())
        //         .then((data) => {
        //             let api = data.response
        //             let getStatusServer = data.response.hostname

        //             if (!getStatusServer) {
        //                 message.reply(`Server Offline`)
        //             } else {
        //                 message.reply(`${api.hostname}`)
        //             }
        //         })

    },
};
