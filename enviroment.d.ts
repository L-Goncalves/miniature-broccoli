declare global {
    namespace NodeJS {
        interface ProcessEnv{
            botToken: string;
            guildId: string;
            enviroment: 'dev' | 'prod' | 'staging'
        }
    }
}


export {};