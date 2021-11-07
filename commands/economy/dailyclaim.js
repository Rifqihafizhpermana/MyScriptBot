const { Message, Client, MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "dailyclaim",
    description: "Take your daily prize",
    aliases: ['claimd'],
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

        const getDaily = await cs.daily({
            user: message.author,
            guild: {id :null},
            amount: 20000,
    
        });

        const getBalance = await cs.balance({
            user: message.author,
            guild: {id :null}
        });        

        if (getDaily.error) {

            const msgCooldows = new MessageEmbed()
                .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                .setColor('YELLOW')
                .setDescription(`You have used daily recently Try again in ${getDaily.time}`)        
                .setFooter(`Request By ${message.author.tag}`)
                .setTimestamp()
                .setTitle('Daily Cooldown')                    
            message.reply({ embeds: [msgCooldows] });

        } else {

            const msgClaimed = new MessageEmbed()
                .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                .setColor('YELLOW')
                .setDescription(`You have earned $${(getDaily.amount).toLocaleString()}.`)        
                .setFields(
                    { name: 'And now you ZexCash increases by', value: `$${(getBalance.wallet).toLocaleString()}` }
                )
                .setFooter(`Request By ${message.author.tag}`)
                .setTimestamp()
                .setTitle(`Claim Daily ${message.author.tag}`)
            message.reply({ embeds: [msgClaimed] });

        }

        // if (result.error) return message.channel.send(`You have used daily recently Try again in ${result.time}`);
        // else message.channel.send(`You have earned $${(result.amount).toLocaleString()}.`)
    },
};
