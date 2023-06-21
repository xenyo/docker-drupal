const fs = require('fs-extra');
const handlebars = require('handlebars');
const walkSync = require('walk-sync');

const contexts = [
  {
    name: 'drupal-php81',
    php_version: '8.1',
    apache_port: 8081,
  },
  {
    name: 'drupal-php80',
    php_version: '8.0',
    apache_port: 8080,
  },
  {
    name: 'drupal-php74',
    php_version: '7.4',
    apache_port: 8074,
  },
  {
    name: 'drupal-php73',
    php_version: '7.3',
    apache_port: 8073,
  },
];

contexts.forEach(context => {
  fs.emptyDirSync(`containers/${context.name}`);
  walkSync('src', { directories: false }).forEach(file => {
    const template = handlebars.compile(fs.readFileSync(`src/${file}`, 'utf8'));
    const output = template(context);
    fs.outputFileSync(`containers/${context.name}/${file}`, output, 'utf8');
  });
});
