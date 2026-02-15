import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19588.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19588
    }
});
export default client;