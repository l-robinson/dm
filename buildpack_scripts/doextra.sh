#!/bin/bash

# buildpack_scripts/doextra.sh

# Use this script to help enhance the ability of heroku-buildpack

# heroku-buildpack is software used by heroku to help deploy applications.
rails_root=`pwd`

echo rails_root is $rails_root
echo gem path is $GEM_PATH
echo gem home is $GEM_HOME
cd ${rails_root}/vendor/
ls /app

# I should install sqlite3 software locally under rails_root

mkdir -p ${rails_root}/vendor/sqlite3
tar zxf  ${rails_root}/vendor/sqlite-autoconf-3130000.tar.gz
cd sqlite-autoconf-3130000/
./configure --prefix=${rails_root}/vendor/sqlite3
make
make install

# I should be able to gem install sqlite3 now
gem list sqlite3
echo Now installing sqlite3...
gem install sqlite3 -v '1.3.12' -- --with-sqlite3-dir=${rails_root}/vendor/sqlite3
gem list sqlite3

exit