const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setnick",
    description: "Enrolled in this guild",
    options: [
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
            interaction.reply({ content: `This command is in the trial`, ephemeral: true });
            // const args = interaction.options._hoistedOptions;

            // const user = client.user.id
            // const nickname = args.find(x => x.name === "nickname");

            // const msgEmbed = new MessageEmbed().setColor('RED')
            // // if (!user.member.manageable && user.member.id === client.user.id) {
            // //     msgEmbed.setDescription(`:x: I Cant Change ${user.member.toString()}'s Nickname`)
            // //     return interaction.reply({ embeds: [msgEmbed] })
            // // }

            // const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

            // await user.member.addrole
            // await user.member.setNickname(nickname.value);

            // msgEmbed.setDescription(`:white_check_mark: ${user.member.toString()}'s Nickname Changed`).setFooter(`From ${oldNick} To ${nickname.value}`)
            // await interaction.followUp({ embeds: [msgEmbed] });
        } catch (err) {
            console.log("Something Went Wrong => ", err)
        }
    },
};