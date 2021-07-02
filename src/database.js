import pg from 'pg';

const {Pool} = pg;

const databaseConfig = {
    host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.NODE_ENV === 'test' ? 'drogas_camp_test' : 'drogas_camp'
}

const connection = new Pool(databaseConfig);

export default connection;