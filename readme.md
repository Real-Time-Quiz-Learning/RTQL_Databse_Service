# Setup (not finished yet)

1. Install mysql (if you have not already).

```bash
sudo apt upgrade
sudo apt update
sudo apt install mysql.server
```

2. Install project dependencies

```bash
npm i
```

3. Login to mysql as the root user.
4. Run the [ddl](./data/ddl.sql) statements to define schema for `rtql` database.
5. Run the [dcl](./data/dcl.sql) statements to define user and grant account permissions.
6. **(Optional)** If testing data is to be present, run the [dml](./data/dml.sql) statements.
7. Provide definitions for the following environment variables and launch the application using node.

```env
PORT=<intended_port>
MSQL_HOST=<mysql_host>
MSQL_DB=<mysql_database>
MSQL_USER=<mysql_user>
MSQL_PASSWORD=<mysql_user_password>
```
