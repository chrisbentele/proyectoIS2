sudo service postgresql start
sudo -i -u postgres dropdb --if-exists proyectoIS2; createdb proyectoIS2;
sudo -i -u postgres dropuser --if-exists admin_proyecto; createuser admin_proyecto;
sudo -i -u postgres psql --command "ALTER USER admin_proyecto WITH SUPERUSER;";
 # echo '\x \\ SELECT * FROM foo;' | psql
