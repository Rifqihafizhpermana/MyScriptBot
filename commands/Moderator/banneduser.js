const {
    Message,
    Client,
    MessageButton,
    MessageActionRow,
    MessageEmbed
} = require("discord.js");

const ms = require("ms")

module.exports = {
    name: "banneduser",
    aliases: ['banuser', 'buser'],
    description: "Ban a member from this guild",
    UserPerms: ["BAN_MEMBERS"],
    BotPerms: ["BAN_MEMBERS"],
    cooldown: 10,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("**Please mention a member first!**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

        if (!member) return message.reply("**The user you provided is not valid in this guild, try using User ID or User Name or try to mention the member!**")

        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply("**You cannot ban a member of your same level or higher!**")

        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("**I cannot ban a member of my same level or higher!**")

        const row = new MessageActionRow().addComponents(

            new MessageButton()
                .setStyle('DANGER')
                .setCustomId("banyes")
                .setLabel("Yes"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setCustomId("banno")
                .setLabel("No"),

        )

        let banAskEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("**⚠ - Do you really want to ban this member?**")

        let banEndEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Thanks for using ownzex to use this command")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason provided"

        let banEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${member} has successfully been baned for : ${reason}`)

        let banEmbed2 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Cancelled ban request!`)

        const banPage = await message.reply({ embeds: [banAskEmbed], components: [row] })

        const col = await banPage.createMessageComponentCollector({
            componentType: "BUTTON",
            time: ms('10s'),
        })

        col.on('collect', i => {

            if (i.user.id !== message.author.id) return

            if (i.customId === 'banyes') {

                member.ban({ reason })

                member.send(`You've been baned from **${message.guild.name}** by ${message.author} for : ${reason}`)

                banPage.edit({ embeds: [banEmbed], components: [] })

            }

            else if (i.customId === 'banno') {

                banPage.edit({ embeds: [banEmbed2], components: [] })

            }

        })

        col.on('end', () => {

            banPage.edit({ embeds: [banEndEmbed], components: [] })

        })
    },
};
