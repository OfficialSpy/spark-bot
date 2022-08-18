const { Client, CommandInteraction, TextInputStyle, InteractionType, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");
const roleSchema = require("../../Schemas/verifyRoleId");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    // Command Handler
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({
        content: "This command is outdated",
        ephemeral: true,
      });
    }

    if (interaction.isChatInputCommand()) {
      switch (interaction.commandName) {
        case "setup":
          const channel = interaction.options.getChannel("channel");

          const embed = new EmbedBuilder()
            .setDescription(
              "Welcome to the server! Please authorize yourself by clicking the button below! When you verify you will be granted the 'verified' role"
            )
            .setColor("ORANGE")
            .setTitle(`Welcome to ${interaction.guild.name}!`);

          const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("verifyMember")
              .setLabel("Verify")
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("999698148178010162")
          );

          channel.send({
            embeds: [embed],
            components: [button],
          });

          break;
      }
    }

    
    command.execute(interaction, client);
  },
};
