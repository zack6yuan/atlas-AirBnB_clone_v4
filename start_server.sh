#!/bin/bash
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db python3 -m web_dynamic.4-hbnb

python3 -m api.v1.app
# Change "python3.8" to whatever version of python works best for you, perhaps just "python3"
# Change "4-hbnb" (at the very end) to whichever hbnb you are testing. 4-hbnb is the last one.
# This script is designed to work with Bash on Linux
# This script runs the web server using the mysql database, NOT local file storage.
# You need to run setup_mysql_dev.sql in the mysql server and import web_flask/100-dump.sql to the database before doing this for the first time.
