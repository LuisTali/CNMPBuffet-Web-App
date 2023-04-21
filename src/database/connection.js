import sql from 'mssql';
import config from '../config';

const dbSetting = {
    user : config.username,
    password : config.password,
    server: config.serverName,
    database: config.database,
    port: Number(config.dbPort),
    options:{
        encrypt: true, // for azure, servicio en nube de microsoft
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

const stringSetting = `Server=${config.serverName},${config.dbPort};Database=${config.database};User Id=${config.username};Password=${config.password};Encrypt=true`;

const getConnection = async()=>{
    try {
        const pool = await sql.connect(stringSetting);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql,getConnection};