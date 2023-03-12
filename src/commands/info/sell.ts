import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
    name: 'sell',
    description: 'Venda sua conta',
    run: async ({ interaction }) => {
        const options = [
            {
                label: 'Overwatch 2',
                description: 'Overwatch 2 é um jogo de FPS ',
                value: 'Overwatch2'
            },
            {
                label: 'GTA V ONLINE',
                description: 'GTA V ONLINE é um Jogo de mundo aberto',
                value: 'GTAVONLINE'
            }
        ];

        const selectMenu: any = new ActionRowBuilder().setComponents(
            new StringSelectMenuBuilder().setCustomId('options').setOptions(options).setPlaceholder('Nenhum Jogo Selecionado.')
        );
        

        
        interaction.editReply({
            components: [selectMenu.toJSON()]
        });
     
    }
});
