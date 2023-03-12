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

 
    const newMessage = interaction.update({ content: `Conta: ${interaction.values[0]} - Selecione as Roles que tem rank:`, components: [selectMenu] });

    const filter = (interaction: { isSelectMenu: () => any; customId: string; }) =>
        interaction.isSelectMenu() && interaction.customId === 'role_options_ow2';
    const collector = (await newMessage).createMessageComponentCollector({ filter, time: 60000 });
        
    collector.on('collect', (interaction) => {

        // Handle the interaction
        if (interaction.isStringSelectMenu()) {
            handleSelectMenus(interaction, interaction.values, 0, [
                {
                    label: 'Grandmaster',
                    value: 'Grandmaster',
                },
                {
                    label: 'Masters',
                    value: 'Masters',
                },
                {
                    label: 'Diamond',
                    value: 'Diamond',
                },
                {
                    label: 'Platinum',
                    value: 'Platinum',
                },
                {
                    label: 'Gold',
                    value: 'Gold',
                },
                {
                    label: 'Silver',
                    value: 'Silver',
                },
                {
                    label: 'Bronze',
                    value: 'Bronze',
                }
                
            ]);
        } 
    });
}


export async function handleSelectMenus(interaction: any,  values: any, currentIndex = 0, options?: any, ) {
    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder().setCustomId(`role_options_ow2_${values[currentIndex]}`).setOptions(options).setPlaceholder('Nenhuma Rank Selecionado')
    );
  
    const menusMap = new Map([[selectMenu.components[0].data.custom_id, selectMenu]]);
    
    const currentRole = values[currentIndex];
    const nextRoleIndex = currentIndex + 1;
  
    const message = await interaction.update({ fetchReply: true, content: `Conta: Overwatch 2 - ${values} - Selecione o Rank de ${currentRole}:`, components: [menusMap.get(`role_options_ow2_${currentRole}`)] });
    const filter = (interaction: { isSelectMenu: () => any; customId: string; }) =>
        interaction.isSelectMenu() && interaction.customId === `role_options_ow2_${currentRole}`;
    const collector = message.createMessageComponentCollector({ filter, time: 60000 });
    
    collector.on('collect', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
            if (nextRoleIndex === values.length) {
                console.log(interaction.values);
                // reached the end of roles, do something with the final values here
            } else {
                await handleSelectMenus(interaction , values, nextRoleIndex , options  );
            }
        }
    });
}