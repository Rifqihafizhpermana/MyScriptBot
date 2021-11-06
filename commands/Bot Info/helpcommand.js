const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, Interaction } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['h'],
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

        const helpEmbed = new MessageEmbed()
            .setDescription('Please choose a category in the dropdown menu');

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
                    .setTitle(`${directory} Command`)
                    .setDescription("Here Are The List Of Command")
                    .addFields(
                        category.commands.map((cmd) => {
                            return {
                                name: `\`${cmd.name}\``,
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
