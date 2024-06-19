import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

//const REDIS_HOST = path.resolve('./secret/development/redis-host');

export default () => ({
    port: parseInt(process.env.PORT, 10) || 9001,

    database: {
        redis: {
            //host: fs.readFileSync(REDIS_HOST).toString(),
            host: process.env.REDIS_HOST_ENV || 'localhost',
            port: 6379
        }
    }
});
