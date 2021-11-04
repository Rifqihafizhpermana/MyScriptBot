const Discord = require("discord.js");
const client = require("../index");
const cooldowns = new Map()
const { owner } = require('../config.json')

client.on("messageCreate", async (message) => {
    if (message.author.id === owner) {
        message.react('<:ownzex_king:905234453247447112>')
    }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    const getCommand = client.commands.get(cmd.toLowerCase());

    if (command) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }

        const currentTime = Date.now()
        const timeStamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown) * 1000

        if (timeStamps.has(message.author.id)) {
            const expTime = timeStamps.get(message.author.id) + cooldownAmount

            if(currentTime < expTime) {
                const timeLeft = (expTime - currentTime) / 1000

                const tmotEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Please Wait \`${timeLeft.toFixed(1)}\` more second before using \`${command.name}\`!`)

                return message.reply({ embeds: [tmotEmbed] })
            }
        }

        timeStamps.set(message.author.id, currentTime)

        setTimeout(() => {
            timeStamps.delete(message.author.id)
        }, cooldownAmount)

        const momsgEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription("I need atleast `SEND MESSAGES`, `EMBED LINKS` permissions to execute any command in this server!")

        const upEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`You need \`${command.UserPerms || []}\` permission(s) to execute this command!`)
            
        const bpEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`I need \`${command.BotPerms || []}\` permission(s) to execute this command!`)

        if (!message.guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) return message.member.send({ embeds: [momsgEmbed] })
        if (!message.member.permissions.has(command.UserPerms || [])) return message.reply({ embeds: [upEmbed] })
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.reply({ embeds: [bpEmbed] })   
    }

    if (!command) return;
    await command.run(client, message, args);

    // if (message.author.id === owner) {
    //     message.react('<:emoji_3:905222293049978911>')
    // }
});
