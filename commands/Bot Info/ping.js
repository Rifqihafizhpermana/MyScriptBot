const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [''],
    description: "Show a ping bot",
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 0,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply(`${client.ws.ping} ws ping`);
    },
};
