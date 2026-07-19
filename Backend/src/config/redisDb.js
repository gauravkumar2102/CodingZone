import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'cream-trick-fir-46398.db.redis.io',
        port: 18238
    }
});
export default client;
