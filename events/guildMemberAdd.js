const client = require('../index');
const { idGuild, joinLogChannel, anounceChannel } = require('../config.json');
const Discord = require('discord.js');

client.on("guildMemberAdd", async (message) => {
    if (message.guild.id === idGuild) {
        const msgWelcome = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setTitle(`${message.user.tag} Has Joined`)
            .setDescription(`Selamat datang <@${message.user.id}> di discord Merpati Roleplay, Kamu adalah member ke **${message.guild.memberCount}**`)
            .setFooter(`${message.user.username}#${message.user.discriminator} Has Joined`,message.user.displayAvatarURL({dynamic: true, size: 512}))
            .setTimestamp()
        message.guild.channels.cache.get(joinLogChannel).send({ embeds: [msgWelcome] });

        if (message.user.bot) {
            const msgEmbedBot = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                .setTitle(`Bot ${message.user.tag} Has Joined`)
                .setDescription(`**Warning** Bot <@${message.user.id}> Has joined, **Kick atau tidak?**`)
                .setFooter(`Warning ${message.user.username}#${message.user.discriminator} Has Joined`,message.user.displayAvatarURL({dynamic: true, size: 512}))
                .setTimestamp()
                
            message.guild.channels.cache.get(anounceChannel).send({ embeds: [msgEmbedBot] })
        }
    }
})