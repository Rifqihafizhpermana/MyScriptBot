const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setnick",
    description: "Change a nickname member",
    options: [
    {
        name: "user",
        description: "User to change nickname",
        type: 6,
        required: true,
    },
    {
        name: "nickname",
        description: "New nickname",
        type: 3,
        required: true,
    }    
],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        try {
            const args = interaction.options._hoistedOptions;

            const user = args.find(x => x.name === "user");
            const nickname = args.find(x => x.name === "nickname");

            const msgEmbed = new MessageEmbed().setColor('RED')
            if (!user.member.manageable && user.member.id === client.user.id) {
                msgEmbed.setDescription(`:x: I Cant Change ${user.member.toString()}'s Nickname`)
                return interaction.reply({ embeds: [msgEmbed] })
            }

            const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

            await user.member.setNickname(nickname.value);

            msgEmbed.setDescription(`:white_check_mark: ${user.member.toString()}'s Nickname Changed`).setFooter(`From ${oldNick} To ${nickname.value}`)
            await interaction.followUp({ embeds: [msgEmbed] });
        } catch (err) {
            console.log("Something Went Wrong => ", err)
        }
    },
};