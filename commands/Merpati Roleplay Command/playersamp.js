const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "merpatiplayerinfo",
    aliases: ['playerinfo'],
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
        fetch(`http://anabelle.bot.nu/api/sampquery?ip=20.205.170.145&port=7777`)
        .then((res) => res.json())
            .then((data) => {
                let api = data.response
                let getPlayerOnline = data.response.isPlayersIngame

                if (!getPlayerOnline) {
                    const msgServerOffline = new MessageEmbed()
                        .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                        .setColor('YELLOW')
                        .setDescription('Server Kemungkinan Sedang Maintanance/Offline, Tidak bisa mendapatkan data Pemain')
                        .setFooter('Merpati Roleplay - Player Info')
                        .setTimestamp()
                        .setTitle(`Player Online 0/30`)
                    message.reply({ embeds: [msgServerOffline] })    
                } else {
                    const msgEmbed = new MessageEmbed()
                        .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                        .setColor('YELLOW')
                        .setDescription(`\`[ID] PlayerㅤLevel Ping \n${api.isPlayersIngame}\``)
                        .setFooter('Merpati Roleplay - Player Info')
                        .setTimestamp()
                        .setTitle(`Player Online ${api.isPlayerOnline}/${api.maxplayers}`)  
                    message.reply({ embeds: [msgEmbed] });
                }
            })
    },
};
