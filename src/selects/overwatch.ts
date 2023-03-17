import {
    AnySelectMenuInteraction,
    CacheType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    Message,
    ButtonBuilder,
    ButtonStyle,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';

const selectedRolesAndRanks = [];

function createCollector(
    message: Message<boolean>,
    customId: string,
    nextStep?: (interaction: any) => any
) {
    const filter = (interaction: { isSelectMenu: () => any; customId: string }) =>
        interaction.isSelectMenu() && interaction.customId === `${customId}`;
    const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
    });

    collector.on('collect', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
            nextStep(interaction);
        }
    });

    collector.on('end', (collected, reason) => {
        selectedRolesAndRanks.length = 0;

        console.log(`Collector ended for reason: ${reason}`);
    });
}

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

                await handleSelectMenus(interaction, values, nextRoleIndex, options);
            }
        }
    });
}

export async function setNumberOfRank(
    interaction: AnySelectMenuInteraction<CacheType>,
    allRoles: string[],
    currentRoleIndex?: number | null
) {
    if (currentRoleIndex !== allRoles.length) {
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
                .setCustomId(
                    currentRoleIndex
                        ? `$role_options_ow2_allRoles${currentRoleIndex}`
                        : 'role_options_ow2_allRoles'
                )
                .setOptions(options)
                .setPlaceholder('Nenhuma Número de Rank Selecionado')
        );

        const message = await interaction.update({
            fetchReply: true,
            content: `Conta: Overwatch 2 | ${allRoles} | Selecione o Número do Rank de ${
                allRoles[currentRoleIndex ? currentRoleIndex : 0].split('-')[0]
            }:`,
            components: [selectMenu],
        });

        createCollector(
            message,
            currentRoleIndex
                ? `$role_options_ow2_allRoles${currentRoleIndex}`
                : 'role_options_ow2_allRoles',
            (interaction) => {
                const rankToSet = currentRoleIndex
                    ? selectedRolesAndRanks[currentRoleIndex]
                    : selectedRolesAndRanks[0];

                const index = selectedRolesAndRanks.indexOf(rankToSet);

                selectedRolesAndRanks[index] = `${rankToSet} ${interaction.values[0]}`;

                console.log(
                    selectedRolesAndRanks,
                    rankToSet,
                    interaction.values[0],
                    index
                );
                setNumberOfRank(
                    interaction,
                    allRoles,
                    currentRoleIndex ? currentRoleIndex + 1 : 1
                );
            }
        );
    } else {
        selectPlatform(interaction);
    }
}

async function selectPlatform(interaction: any) {
    const options = [
        {
            label: 'Xbox',
            value: 'Xbox',
        },
        {
            label: 'PC',
            value: 'PC',
        },
        {
            label: 'PSN',
            value: 'PSN',
        },
    ];

    const selectMenu: any = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder()
            .setCustomId('platform')
            .setOptions(options)
            .setPlaceholder('Nenhuma Plataforma Selecionada')
    );

    const message = await interaction.update({
        fetchReply: true,
        content: 'Conta: Overwatch 2 | Selecione sua Plataforma:',
        components: [selectMenu],
    });

    createCollector(message, 'platform', (interaction) => {
        hasBattletagChange(interaction);
    });
}

async function hasBattletagChange(interaction) {
    const buttonNo = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('no_battletag')
            .setEmoji('❌')
            .setLabel('Não')
            .setStyle(ButtonStyle.Secondary)
    );

    const buttonYes = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('yes_battletag')
            .setEmoji('✅')
            .setLabel('Sim')
            .setStyle(ButtonStyle.Primary)
    );

    const input = new TextInputBuilder()
        .setCustomId('competitive_points_ow2')
        .setLabel('Quantos Pontos Competitivos tem na Conta?')
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Insira a quantidade (números apenas)');

    const response = await interaction.update({
        fetchReply: true,
        content:
      'Conta: Overwatch 2 | Sua Conta tem mudança de nome (battletag) grátis?',
        components: [buttonYes, buttonNo],
        embeds: [],
    });

    const filter = (interaction: { isSelectMenu: () => any; customId: string }) =>
        interaction.customId === 'yes_battletag' || interaction.customId === 'no_battletag' || interaction.customId === 'competitive_points_ow2';
    const collector = response.createMessageComponentCollector({
        filter,
        time: 60000,
    });

    collector.on('collect', async (interaction) => {

        interaction.update({  content:
            'Vamos prosseguir com outras perguntas :)', components: []});

    });

    // createCollector(response, 'yes_battletag', (interaction) => {

    //     console.log(interaction);
    //     // hasBattletagChange(interaction);
    // });

    // createCollector(response, 'no_battletag', (interaction) => {
    //     // hasBattletagChange(interaction);
    // });
}
