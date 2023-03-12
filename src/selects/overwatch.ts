import { AnySelectMenuInteraction, CacheType, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export async function handleOverwatchRole(interaction: AnySelectMenuInteraction<CacheType>) {

    const options = [
        {
            label: 'DPS',
            value: 'DPS',
        },
        {
            label: 'TANK',
            value: 'TANK',
        },
        {
            label: 'SUPPORT',
            value: 'SUPPORT',
        },
    ];


    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder().setCustomId('role_options_ow2').setMaxValues(3).setOptions(options).setPlaceholder('Nenhuma Role Selecionada.')
    );

 
    const newMessage = interaction.update({ content: `Conta: ${interaction.values[0]}. Selecione as Roles que tem rank:`, components: [selectMenu] });

    const filter = (interaction: { isSelectMenu: () => any; customId: string; }) =>
        interaction.isSelectMenu() && interaction.customId === 'role_options_ow2';
    const collector = (await newMessage).createMessageComponentCollector({ filter, time: 60000 });
        
    collector.on('collect', (interaction) => {

        // Handle the interaction
        if (interaction.isStringSelectMenu()) {
            // handleOverwatchRank(interaction);
        } 
    });
}