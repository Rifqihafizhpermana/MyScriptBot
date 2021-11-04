const client = require("../index");
const fetch = require("node-fetch")

client.on("ready", () => {
    console.log(`\x1b[31m[BOT]: \x1b[37m${client.user.tag} \x1b[31mReady!!.\x1b[0m`)

    client.user.setStatus('idle');

    fetch(`http://anabelle.bot.nu/api/sampquery?ip=20.205.170.145&port=7777`)
    .then((res) => res.json())
    .then((data) => {
        let api = data.response

        const statusBot = [
            `OWNZEX BOTZ`,
            `${client.users.cache.size} Pengguna`,
            `${client.guilds.cache.size} Server Discord`,
            `Player Online ${api.isPlayerOnline}/${api.maxplayers}`
        ]    
        
        setInterval(() => {
            client.user.setActivity(statusBot[Math.floor(Math.random() * statusBot.length)], {type: "WATCHING"})
        }, 5000)        
    })

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
