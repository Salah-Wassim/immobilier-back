require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_DEV_USERNAME,
    "password": process.env.DB_DEV_PWD,
    "database": process.env.DB_DEV_NAME,
    "host": process.env.DB_DEV_HOST,
    "dialect": process.env.DB_DEV_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
