sudo service postgresql start
sudo su - postgres -c "createuser -s $USER"
sudo -u postgres psql -c "ALTER USER $USER WITH SUPERUSER;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $USER;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $USER;"
sudo -u postgres psql -c "CREATE DATABASE $USER;"
sudo -u postgres -i psql --command "DROP ROLE IF EXISTS admin_proyecto; CREATE ROLE admin_proyecto superuser;";
sudo -u postgres -i dropdb --if-exists proyectois2; createdb proyectois2;
# sudo -i -u postgres dropuser --if-exists admin_proyecto; createuser admin_proyecto;
# sudo -i -u postgres psql --command "ALTER USER admin_proyecto WITH SUPERUSER;";
 # echo '\x \\ SELECT * FROM foo;' | psql
