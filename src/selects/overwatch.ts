import {
    AnySelectMenuInteraction,
    CacheType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    Message,
} from 'discord.js';

const selectedRolesAndRanks = [];

export async function handleOverwatchRole(
    interaction: AnySelectMenuInteraction<CacheType>
) {
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
        new StringSelectMenuBuilder()
            .setCustomId('role_options_ow2')
            .setMaxValues(3)
            .setOptions(options)
            .setPlaceholder('Nenhuma Role Selecionada.')
    );

    const newMessage = interaction.update({
        content: `Conta: ${interaction.values[0]} - Selecione as Roles que tem rank:`,
        components: [selectMenu],
    });

    const filter = (interaction: { isSelectMenu: () => any; customId: string }) =>
        interaction.isSelectMenu() && interaction.customId === 'role_options_ow2';
    const collector = (await newMessage).createMessageComponentCollector({
        filter,
        time: 60000,
    });

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
                },
            ]);
        }
    });
}

export async function handleSelectMenus(
    interaction: any,
    values: any,
    currentIndex = 0,
    options?: any
) {
    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder()
            .setCustomId(`role_options_ow2_${values[currentIndex]}`)
            .setOptions(options)
            .setPlaceholder('Nenhuma Rank Selecionado')
    );

    const menusMap = new Map([
        [selectMenu.components[0].data.custom_id, selectMenu],
    ]);

    const currentRole = values[currentIndex];
    const nextRoleIndex = currentIndex + 1;

    const message = await interaction.update({
        fetchReply: true,
        content: `Conta: Overwatch 2 - ${values} - Selecione o Rank de ${currentRole}:`,
        components: [menusMap.get(`role_options_ow2_${currentRole}`)],
    });
    const filter = (interaction: { isSelectMenu: () => any; customId: string }) =>
        interaction.isSelectMenu() &&
    interaction.customId === `role_options_ow2_${currentRole}`;
    const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
    });

    collector.on('collect', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
            if (nextRoleIndex === values.length) {
                selectedRolesAndRanks.push(`${currentRole} - ${interaction.values[0]}`);

                setNumberOfRank(interaction, selectedRolesAndRanks);
                // reached the end of roles, do something with the final values here
            } else {
                selectedRolesAndRanks.push(`${currentRole} - ${interaction.values[0]}`);
                // console.log(selectedRolesAndRanks);
                await handleSelectMenus(interaction, values, nextRoleIndex, options);
            }
        }
    });
}

export async function setNumberOfRank(
    interaction: AnySelectMenuInteraction<CacheType>,
    allRoles: string[],
    currentRole?: string | null
) {
    const options = [
        {
            label: '1',
            value: '1',
        },
        {
            label: '2',
            value: '2',
        },
        {
            label: '3',
            value: '3',
        },
        {
            label: '4',
            value: '4',
        },
        {
            label: '5',
            value: '5',
        },
    ];

    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder()
            .setCustomId('role_options_ow2_allRoles')
            .setOptions(options)
            .setPlaceholder('Nenhuma Número de Rank Selecionado')
    );

    if (currentRole) {
        const message = await interaction.update({
            fetchReply: true,
            content: `Conta: Overwatch 2 | ${allRoles} | Selecione o Número do Rank de ${
                allRoles[0].split('-')[0]
            }:`,
            components: [selectMenu],
        });

        createCollector(message, 'role_options_ow2_allRoles', () =>
            setNumberOfRank(interaction, allRoles)
        );
    }

    const message = await interaction.update({
        fetchReply: true,
        content: `Conta: Overwatch 2 | ${allRoles} | Selecione o Número do Rank de ${
            allRoles[0].split('-')[0]
        }:`,
        components: [selectMenu],
    });

    // console.log(interaction, role );
}

//     const message = await interaction.update({ fetchReply: true, content: `Conta: Overwatch 2 - ${values} - Selecione o Rank de ${currentRole}:`, components: [menusMap.get(`role_options_ow2_${currentRole}`)] });
// }

function createCollector(
    message: Message<boolean>,
    customId: string,
    nextStep?: () => any
) {
    const filter = (interaction: { isSelectMenu: () => any; customId: string }) =>
        interaction.isSelectMenu() && interaction.customId === `${customId}`;
    const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
    });

    collector.on('collect', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
            return nextStep();
        }
    });
}
