const { Message, Client, MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "balance",
    aliases: ['bal'],
    UserPerms: ["ADMINISTRATOR"],
    BotPerms: [""],
    cooldown: 5,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;
        } else if (!args[0]) {
            user = message.author;
        }

        let result = await cs.balance({
            user: user,
            guild: {id :null}
        });

        const msgEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setTitle(`${user.tag} Balance`)
            .setFields(
                { name: 'Amount of ZexCash In Your Wallet', value: `$${(result.wallet).toLocaleString()}`},
                { name: 'And ZexCash In Your Bank Is', value: `$${(result.bank).toLocaleString()} / $${(result.rawData.bankSpace.toLocaleString())}`}
            )
            .setFooter(`${user.tag} Your Balance`)
            .setTimestamp()

        message.reply({ embeds: [msgEmbed] })

        //message.channel.send(`${user.tag}, has $${(result.wallet).toLocaleString()} in there wallet and $${(result.bank).toLocaleString()} in there bank. There Max bank has been set to $${(result.rawData.bankSpace.toLocaleString())}`);
    },
};
