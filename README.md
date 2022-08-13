# storeFront-Backend

## Project setup instructions

To setup database 

install postgreSql using command `npm i postgres` and its types `npm i @types/postgres`

install dotenv using command to write database variables in it `npm i dotenv` and its types `npm i @types/dotenv`

#### To connect to the database

1. connect to `psql`

2. create the database `create database database-name;`

3. connect to the database using `\c database-name;`

#### Ports:

`3000` -> **backend port**

`5432` -> **database port**

### dotenv file

1. POSTGRES_HOST= localhost

2. POSTGRES_DB= storefront

3. POSTGRES_TEST_DB= storefront_test

4. POSTGRES_USERNAME = postgres

5. POSTGRES_PASSWORD = postgres

6. ENV=dev

7. PEPPER=yourSecret

8. SALT=10

9. TOKEN_SECRET=yourSecret