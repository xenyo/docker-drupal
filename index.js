const fs = require('fs-extra');
const handlebars = require('handlebars');
const walkSync = require('walk-sync');

const contexts = [
  {
    name: 'drupal-php83',
    php_version: '8.3',
    apache_port: 8083,
    mariadb_port: 3383,
    ssh_port: 2283,
  },
  {
    name: 'drupal-php81',
    php_version: '8.1',
    apache_port: 8081,
    mariadb_port: 3381,
    ssh_port: 2281,
  },
  {
    name: 'drupal-php80',
    php_version: '8.0',
    apache_port: 8080,
    mariadb_port: 3380,
    ssh_port: 2280,
  },
  {
    name: 'drupal-php74',
    php_version: '7.4',
    apache_port: 8074,
    mariadb_port: 3374,
    ssh_port: 2274,
  },
  {
    name: 'drupal-php73',
    php_version: '7.3',
    apache_port: 8073,
    mariadb_port: 3373,
    ssh_port: 2273,
  },
];

contexts.forEach(context => {
  walkSync('src', { directories: false }).forEach(file => {
    const template = handlebars.compile(fs.readFileSync(`src/${file}`, 'utf8'));
    const output = template(context);
    fs.outputFileSync(`${context.name}/${file}`, output, 'utf8');
  });
});
