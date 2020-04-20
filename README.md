# Campus Sustainability Tour
## Release Notes - Version 1.0
### NEW FEATURES
*Campus Sustainability Tour*
- Added a default tour route available from application startup
- Added confirmation windows to several non-reversible actions
- Added new setting to only display tour locations that match specified filters
- Added an error popup if the audio fails to load
- Updated the look of the home page, map header, map footer, and various buttons
- Replaced hard-coded location information with real information provided by the Georgia Tech Office of Campus Sustainability

*Administrator Panel*
- Added stop reordering to allow for modifying the default tour route
- Added ability to add and delete existing administrator accounts for users with existing superadmin accounts
- Added ability to change the password of the logged-in account
- Added confirmation windows to several non-reversible actions
	
### BUG FIXES
- Reworked buggy route reordering to provide better user experience
- Fixed location description and transcript not correctly displaying new lines
- Location detail view scaling has been adjusted to prevent squished windows
- Next stop indicator now indicates the first stop instead of “N/A”
	
### KNOWN BUGS
- There is no way to log out of the administrator panel. The logged-in user’s session will expire when the browser is closed or one hour has passed since the log in. 

## Install  Guide - Version 1.0
### PREREQUISITES:
- Install Node.js (version 13.0.0 or above) 
- Install npm (version 6.14 or above)
- MySQL Server (version 8 or above), configured to use legacy type password support and running on port 3306
### DEPENDENCIES:
- See package.json in client/, admin/, and backend/ directories for a full listing
### DOWNLOAD:
- https://github.com/kalenpatton/gt-sustainability-tour/archive/master.zip
### INSTALLATION: 
- Run “npm install” in the admin, backend, and client directories.
- Execute the “database/db_generate_table_and_insert.sql” script to setup the MySQL database. 
- Rename the “.envTEMPLATE” file to simply “.env”, and fill in the required fields.
### RUNNING APPLICATION:
- For user access, run “npm start” in the backend and client directories from separate terminals.
  - For the backend to function correctly, MySQL server should also be running.
  - Connect to “localhost:3000” if the app does not launch automatically
- For administrator access, run “npm start” in the backend and admin directories from separate terminals.
  - Connect to “localhost:3002” if the app does not launch automatically
### TROUBLESHOOTING:
- “ERR! code ELIFECYCLE”  errors when running npm commands: This is due to outdated node package or npm. Try upgrading your node.js and npm, and then clean the cache. (npm cache clean --force)
- Unable to run npm commands due to permission: Add  “sudo” before the command and enter the password of your device
- Errors regarding dependencies: Delete node_modules (or clean the cache) and rerun “npm install”
- ER_NOT_SUPPORTED_AUTH_MODE: Reconfigure your MySQL server to use legacy type password support
