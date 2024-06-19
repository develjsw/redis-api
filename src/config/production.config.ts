import * as fs from 'fs';
import * as path from 'path';

const REDIS_HOST = path.resolve('./secret/production/redis-host');

export default () => ({
    port: parseInt(process.env.PORT, 10) || 9001,

    database: {
        redis: {
            host: fs.readFileSync(REDIS_HOST).toString(),
            port: 6379
        }
    }
});
