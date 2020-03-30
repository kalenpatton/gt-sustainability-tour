Setup the database yourself:

1. Install MySQL Server and MySQL Workbench.

2. Start the MySQL Server.

3. Open Workbench and add a connection to your MySQL server. Open the connection.

4. File -> Run SQL Script -> db_generate_table_and_insert.sql

5. Close your instance tab and reopen the connection. The database and table should have been created and can be seen under the "Schemas" tab.

<<<<<<< Updated upstream
6. Modify the top of backend/routes/<all files> with your server's username and password. This is a bad way to do this, but I'll fix it later.
=======
6. Create a .env file in the backend directory with the fields DB_HOST, DB_USER, AND DB_PASS and your server's credentials.
>>>>>>> Stashed changes

7. You did it, Database Guru!