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
        new StringSelectMenuBuilder().setCustomId('role_options_ow2').setOptions(options).setPlaceholder('Nenhuma Role Selecionada.')
    );
        
    await interaction.followUp({
        content: 'Selecione a Role:',
        components: [selectMenu.toJSON()]
    });
}


export async function handleOverwatchRank(interaction: AnySelectMenuInteraction<CacheType>) {
    const options = [
        {
            label: 'Grandmaster',
            value: 'GM',
        },
        {
            label: 'Masters',
            value: 'M',
        },
        {
            label: 'Diamond',
            value: 'D',
        },
        {
            label: 'Plat',
            value: 'P',
        },
        {
            label: 'Gold',
            value: 'G',
        },
        {
            label: 'Silver',
            value: 'S',
        },
        {
            label: 'Bronze',
            value: 'B',
        },
        {
            label: 'No Rank',
            value: 'NORANK',
        },
        
        
    ];


    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder().setCustomId('role_rank_options_ow2').setOptions(options).setPlaceholder('Nenhum Jogo Selecionado.')
    );
        
    await interaction.followUp({
        content: 'Selecione o Rank:',
        components: [selectMenu.toJSON()]
    });
}