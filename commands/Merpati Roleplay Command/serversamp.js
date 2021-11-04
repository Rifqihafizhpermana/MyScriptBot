const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "merpatiserverinfo",
    aliases: ['serverinfo'],
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
        // const getIP = args.slice(0).join(' ');
        // const getPORT = args.slice(1).join(' ');

        // if(!getIP) return message.reply('Masukkan ip server samp');
        // if(!getPORT) return message.reply('Masukkan port server samp');

        fetch(`http://anabelle.bot.nu/api/sampquery?ip=20.205.170.145&port=7777`)
            .then((res) => res.json())
                .then((data) => {
                    let api = data.response
                    let getStatusServer = data.response.hostname
                    
                    // try {
                    //     message.reply('Server sedang Online');
                    // } catch (err) {
                    //     message.reply('Server sedang Offline');
                    // }

                    if (!getStatusServer) {
                        const msgServerOffline = new MessageEmbed()
                            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                            .setColor('YELLOW')
                            .setDescription("Server Kemungkinan Sedang Maintanance/Offline, Tidak bisa mendapatkan data Server")
                            .setFooter('Merpati Roleplay - Server Status')
                            .setTimestamp()
                            .setTitle(`Merpati Roleplay - Status Server`)
                        message.reply({ embeds: [msgServerOffline] })    
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
                            .setFooter('Merpati Roleplay - Status Server')
                            .setTimestamp()
                            .setTitle(`${api.hostname} - Status Server`)    
                        message.reply({ embeds: [msgEmbed] })
                    }

                    // const msgEmbed = new MessageEmbed()
                    //     .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                    //     .setColor('YELLOW')       
                    //     .setFields(
                    //         { name: 'Gamemode', value: `${api.gamemode}` },
                    //         { name: 'Player Online', value: `${api.isPlayerOnline}/${api.maxplayers}` },
                    //         { name: 'Language', value: `${api.language}` },
                    //         { name: 'Website Server', value: `${api.rule.weburl}` },
                    //         { name: 'Server Versions', value: `${api.rule.version}` },
                    //     )
                    //     .setFooter('Merpati Roleplay Server Info')
                    //     .setTimestamp()
                    //     .setTitle(`${api.hostname} - Server Info`)    
                    // message.reply({ embeds: [msgEmbed] }).catch((error) => {
                    //     message.reply('Server sedang Offline');
                    // })

                    // if(!api) {
                    //     message.reply('Server sedang Offline');
                    // } else {
                    //     const msgEmbed = new MessageEmbed()
                    //         .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                    //         .setColor('YELLOW')       
                    //         .setFields(
                    //             { name: 'Gamemode', value: `${api.gamemode}` },
                    //             { name: 'Player Online', value: `${api.isPlayerOnline}/${api.maxplayers}` },
                    //             { name: 'Language', value: `${api.language}` },
                    //             { name: 'Website Server', value: `${api.rule.weburl}` },
                    //             { name: 'Server Versions', value: `${api.rule.version}` },
                    //         )
                    //         .setFooter('Merpati Roleplay Server Info')
                    //         .setTimestamp()
                    //         .setTitle(`${api.hostname} - Server Info`)    
                    //     message.reply({ embeds: [msgEmbed] }).catch((error) => {
                    //         message.reply('Server sedang Offline');
                    //     })
                    // }
                })
    },
};
