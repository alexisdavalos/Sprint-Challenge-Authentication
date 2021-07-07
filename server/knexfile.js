const sqlite3 = {
  client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  }
module.exports = {
  development: {
    ...sqlite3,
    connection: {filename:'./database/auth.db3'}, //creates dev database
  },
  testing: {
    ...sqlite3,
    connection: {filename:'./database/test.db3'} //creates testing database
  }
}
