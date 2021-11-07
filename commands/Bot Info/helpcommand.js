const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, Interaction } = require("discord.js");
const { prefix } = require('../config.json')

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Show of the commands",
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 10,    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        const directories = [...new Set(client.commands.map(cmd => cmd.directory))]
        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map(cmd => {
                    return {
                        name: cmd.name || 'Command Is Not Ready To Use',
                        description: cmd.description || `There Is Command No Description`,
                    }
                });
            
            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        });
// There are 7 command categories registered in Ownzex
// Available at 8 Guilds
        const helpEmbed = new MessageEmbed()
            .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
            .setColor('RED')
            .setDescription(`Hello, introduce my ownzex name, I was born to become your companion`)
            .addField(
                '📋 __My Stats__:',
                `>>> ⌛ \`${days}\` **Day**, \`${hours}\` **Hours**, \`${minutes}\` **Minute**, \`${seconds}\` **Second Uptime**\n 📌 There are \`${categories.length}\` **Command Categories** registered in ***OwnZex***\n 🌐 \`${client.ws.ping}ms\` **Ping!**\n 💼 Available at \`${client.guilds.cache.size}\` **Guilds**`
            )
            .setFooter(`Request By ${message.author.tag}`)
            // .setImage()
            // .setThumbnail()
            .setTimestamp()
            .setTitle('My Informations About The Ownzex')

        // const helpEmbed = new MessageEmbed()
        //     .setDescription('Please choose a category in the dropdown menu');

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder('Please selecta a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd ) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} Category`
                            }
                        })
                    )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [helpEmbed],
            components: components(false),
        });

        const filter = (interaction) => interaction.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            //time: 5000,
        });

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

                const menuEmbed = new MessageEmbed()
                    .setAuthor('OWNZEX BOT', 'http://34.126.184.54/image/ppownzex.png')
                    .setColor('RED')
                    .setTitle(`${directory.toUpperCase()} COMMANDS`)
                    .setDescription("Here are the list of command")
                    .addFields(
                        category.commands.map((cmd) => {
                            return {
                                name: `\`${prefix}${cmd.name}\``,
                                value: cmd.description,
                                inline: true,
                            };
                        })
                    );

            interaction.update({ embeds: [menuEmbed] })
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) })
        })

    },
};
