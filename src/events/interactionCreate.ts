/* eslint-disable no-case-declarations */
import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '..';
import { Event } from '../structures/Event';
import { ExtendedInteraction } from '../typings/Command';
import { handleOverwatchRank, handleOverwatchRole } from '../selects/overwatch';

export default new Event('interactionCreate', async (interaction) => {
    // Chat Input Commands
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp('You have used a non existent command');

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    }

    // Select Menu
    if (interaction.isAnySelectMenu()) {
        await interaction.deferReply();
        const selectedValue = interaction.values[0];
    
        if(interaction.customId === 'role_options_ow2'){
    
            handleOverwatchRank(interaction);
        }
        else{
            switch (selectedValue) {
            case 'Overwatch2':
                handleOverwatchRole(interaction);
                break;
                // default:
                //     interaction.editReply('Unknown option selected.');
                //     break;
            }
        }
    }
});
