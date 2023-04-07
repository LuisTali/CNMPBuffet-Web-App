import sql from 'mssql';
import config from '../config';

const dbSetting = {
    user : config.username,
    password : config.password,
    server: config.serverName,
    database: config.database,
    port: Number(config.dbPort),
    options:{
        encrypt: false, // for azure, servicio en nube de microsoft
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const getConnection = async()=>{
    try {
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql,getConnection};