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
        const getIP = args.slice(0).join( );
        const getPORT = args.slice(1).join( );

        if(!getIP) return message.reply('Masukkan ip server samp');
        if(!getPORT) return message.reply('Masukkan port server samp');

        fetch(`http://anabelle.bot.nu/api/sampquery?ip=${getIP}&port=${getPORT}`)
            .then((res) => res.json())
                .then((data) => {
                    let api = data.response
                    let getStatusServer = data.response.hostname

                    if (!getStatusServer) {
                        message.reply(`Server Offline`)
                    } else {
                        message.reply(`${api.hostname}`)
                    }
                })

    },
};
