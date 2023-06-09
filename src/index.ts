import * as dotenv from 'dotenv';
dotenv.config();
import { ExtendedClient } from './structures/Client';

export const client = new ExtendedClient();

client.start();
