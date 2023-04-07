import {config} from 'dotenv'
config();

export default{
    port: process.env.PORT || 5000,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    dbPort: process.env.DBPORT,
    serverName: process.env.SERVER_NAME
}