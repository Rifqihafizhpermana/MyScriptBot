const client = require("../index");
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');

client.on("ready", () => {
    console.log(`\x1b[31m[BOT]: \x1b[37m${client.user.tag} \x1b[31mReady!!.\x1b[0m`)

    const msgStatsBot = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor('Iam Ready To Launch')
        .setTimestamp()

    client.channels.cache.get('906142092185714688').send({ embeds: [msgStatsBot] })

    client.user.setStatus('idle');

    const statusBot = [
        `OWNZEX BOTZ`,
        `${client.users.cache.size} Pengguna`,
        `${client.guilds.cache.size} Server Discord`,
    ]    
        
    setInterval(() => {
        client.user.setActivity(statusBot[Math.floor(Math.random() * statusBot.length)], {type: "WATCHING"})
    }, 5000)        

    // const statusBot = [
    //     `OWNZEX BOTZ`,
    //     `${client.users.cache.size} Pengguna`,
    //     `${client.guilds.cache.size} Server Discord`,
    //     ``
    // ]

    // setInterval(() => {
    //     client.user.setActivity(statusBot[Math.floor(Math.random() * statusBot.length)], {type: "WATCHING"})
    // }, 5000)
});
