Setup the database yourself:

1. Install MySQL Server and MySQL Workbench

2. Start the MySQL Server.

3. Open Workbench and add a connection to your MySQL server. Open the connection.

4. File -> Run SQL Script -> db_generate_table_and_insert.sql

5. Close your instance tab and reopen the connection. The database and table should have been created and can be seen under the "Schemas" tab.

6. Modify backend/routes/locations.js lines 13-14 and 36-37 with your server's username and password. This is a bad way to do this, but I'll fix it in the morning.

7. You did it, Database Guru!