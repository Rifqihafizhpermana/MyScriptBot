const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "purgemessage",
    aliases: ['purge'],
    description: "Delete all messages on this channel",
    UserPerms: ["MANAGE_MESSAGES"],
    BotPerms: ["MANAGE_MESSAGES"],
    cooldown: 20,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`<@${message.author.id}>, Please enter the amount of messages you want to clear`);
        if (isNaN(args[0])) return message.reply(`<@${message.author.id}>, Please enter the real number`)
        if (args[0] > 100) return message.reply(`<@${message.author.id}>, You cannot delete more then 100 messages!`)
        if (args[0] < 1) return message.reply(`<@${message.author.id}>, To delete messages please delete atleast 1 message`)

        await message.channel.messages.fetch({ limit: args[0] })
            .then(messages => {
                message.channel.bulkDelete(messages);
            })
    },
};
