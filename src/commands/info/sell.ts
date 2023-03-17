import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { handleOverwatchRole } from '../../selects/overwatch';

export default new Command({
    name: 'sell',
    description: 'Venda sua conta',
    run: async ({ interaction }) => {

        const options = [
            {
                label: 'Overwatch 2',
                value: 'Overwatch2'
            },
            {
                label: 'GTA V ONLINE',
                value: 'GTAVONLINE'
            }
        ];
    
        const selectMenu: any = new ActionRowBuilder().setComponents(
            new StringSelectMenuBuilder().setCustomId('game_options')
                .setOptions(options).setPlaceholder('Nenhum Jogo Selecionado.')
        );
            
             
        const message = interaction.reply({
            content: 'Selecione um Jogo para Vender sua Conta',
            components: [selectMenu.toJSON()],
            fetchReply: true,
            ephemeral: true,
            
        }); 
        const filter = (interaction: { isSelectMenu: () => any; customId: string; }) =>
            interaction.isSelectMenu() && interaction.customId === 'game_options';
        const collector = (await message).createMessageComponentCollector({ filter, time: 60000 });
     


        collector.on('collect', (interaction) => {
            // Handle the interaction
            if (interaction.isStringSelectMenu()) {
                if(interaction.values[0] === 'Overwatch2'){
                    handleOverwatchRole(interaction);
                }
            } 
        });
          
        collector.on('end', (collected, reason) => {
            console.log(`Collector ended for reason: ${reason}`);
        });


    }
});
