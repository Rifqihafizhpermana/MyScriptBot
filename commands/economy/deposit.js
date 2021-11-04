const { Message, Client, MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "deposit",
    aliases: ['dep'],
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
        let money = args.join(" ");
        if (!money) return message.channel.send("**Enter the amount you want to deposite.**");

        let result = await cs.deposite({
            user: message.author,
            guild: {id :null}, 
            amount: money
        });

        const msgMoney = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setDescription('**Specify an amount to deposite**')        
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle(`Deposite ZexCash`)
                
        const msgNegativeMoney = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setDescription("**You can't deposite negative money**")        
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle(`Deposite ZexCash`)

        const msgLowMoney = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setDescription("**You don't have that much money in wallet.**")        
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle(`Deposite ZexCash`)
          
        const msgNoMoney = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('YELLOW')
            .setDescription("**You don't have any money to deposite**")        
            .setFooter(`Request By ${message.author.tag}`)
            .setTimestamp()
            .setTitle(`Deposite ZexCash`)

        if (result.error) {
            if (result.type === 'money') return message.reply({ embeds: [msgMoney] });
            if (result.type === 'negative-money') return message.reply({ embeds: [msgNegativeMoney] });
            if (result.type === 'low-money') return message.reply({ embeds: [msgLowMoney] });
            if (result.type === 'no-money') return message.reply({ embeds: [msgNoMoney] });
        } else {
            if (result.type === 'all-success') return message.channel.send("**You have deposited all your money to your bank" + `\nNow you've $${result.wallet} In your wallet and $${result.bank} in your bank.**`);
            if (result.type === 'success') return message.channel.send(`**You have deposited $${result.amount} money to your bank.\nNow you've $${result.wallet} In your wallet and $${result.bank} in your bank.**`);
        };
    },
};
