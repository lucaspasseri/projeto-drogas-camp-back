import pg from 'pg';

const {Pool} = pg;

const databaseConfig = {
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: process.env.NODE_ENV === 'test' ? 'drogas_camp_test' : 'drogas_camp'
}

const connection = new Pool(databaseConfig);

export default connection;