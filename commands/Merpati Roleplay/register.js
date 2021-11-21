const { Message, Client, MessageEmbed, Permissions } = require("discord.js");
const { roleAdd } = require('../config.json')

module.exports = {
    name: "register",
    aliases: ['reg'],
    description: "To get the role at the Discord Merpati Roleplay",
    UserPerms: [""],
    BotPerms: ["ADMINISTRATOR"],
    cooldown: 1,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has(["ADMINISTRATOR"])) {
            const msgPerms = new MessageEmbed().setColor('RED').setTitle(`❌ - Can't set up`).addFields({ name: "I can't set you up, Because you have administrator rights", value: "Saya tidak bisa mengatur Anda, karena Anda memiliki hak administrator" })
            return message.reply({ embeds: [msgPerms] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        } 

        if (message.guild.id != "778250646998351892") {
            const msgGuild = new MessageEmbed().setColor('RED').setTitle(`❌ - Command is not running`).addFields({ name: "This command is not available for this guild.", value: "Perintahnya ini tidak tersedia untuk guild ini." })
            return message.reply({ embeds: [msgGuild] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

        if (message.channel.id != "895508044220354590") {
            const msgGuild = new MessageEmbed().setColor('RED').setTitle(`❌ - This channel is not for this command`).addFields({ name: "You can't use this command on this channel.", value: "Anda tidak dapat menggunakan perintah ini di channel ini." })
            return message.reply({ embeds: [msgGuild] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

        //if (message.guild.id != "778250646998351892") return message.reply('**This command is not available for this guild.**')
        //if (message.channel.id != "896263021926694932") return message.reply("**You can't use this command on this channel.**")

        const getNick = args.join(' ');

        if (!getNick.length) {
            const msgGuild = new MessageEmbed().setColor('RED').setTitle(`❌ - Register Error`).addFields({ name: "Please fill in your name first, Example: Naufal_Akbar.", value: "Silakan isi nama ic Anda terlebih dahulu, Contoh: Naufal_Akbar." })
            return message.reply({ embeds: [msgGuild] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

        if (getNick.length > 20) {
            const msgGuild = new MessageEmbed().setColor('RED').setTitle(`❌ - Register Error`).addFields({ name: "Your name cannot be more than 20 characters.", value: "Nama Anda tidak boleh lebih dari 20 karakter." })
            return message.reply({ embeds: [msgGuild] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }        

        if (getNick.includes("_") === false) {
            const msgGuild = new MessageEmbed().setColor('RED').setTitle(`❌ - Register Error`).addFields({ name: "Must use sign \"_\"", value: "Harus menggunakan tanda \"_\"." })
            return message.reply({ embeds: [msgGuild] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        } 

        // if (!getNick) return message.reply("**Please fill in your name first, EXAMPLE: NaufalAkbar**")
        // if (getNick.length > 20) return message.reply("**Your name may not be more than 32 letters**")
        // if (getNick.includes("_") === true) return message.reply('cannot use a sign "_"')

        try {
            message.member.roles.add(roleAdd);
            message.member.setNickname(`${getNick}`);

            const msgDone = new MessageEmbed()
                .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                .setColor('GREEN')
                .setDescription(`**ACCEPTED**, Selamat kamu telah berhasil terdaftar di server ini, Nama kamu telah dirubah menjadi **${getNick}**`)        
                .setFooter(`Registered ${message.author.tag} Aceppted`)
                .setTimestamp()
                .setTitle(`Register System`)
                    
            message.reply({ embeds: [msgDone] })

            //message.channel.send(`**ACCEPTED**, Kamu telah berhasil registrasi di discord ini, Selamat BeRoleplay`);
        } catch (err) {
            console.log(err)
        }
        
        // try {
        //     if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {

        //         await message.member.roles.add(`${getRole}`)
        //         await message.member.setNickname(`${getNick}`)

        //     } else {
        //         message.reply(`You are an admin I can't set this for you`)
        //     }
        // } catch (err) {
        //     console.log(err)
        // }

        // var string = "foo";
        // var substring = "oo";

        // console.log(string.indexOf(substring) !== -1);

        //message.reply('tested')
    },
};
