const fs = require('fs-extra');
const handlebars = require('handlebars');
const walkSync = require('walk-sync');

const contexts = [
  {
    name: 'php81',
    php_version: '8.1',
  },
  {
    name: 'php80',
    php_version: '8.0',
  },
  {
    name: 'php74',
    php_version: '7.4',
  },
  {
    name: 'php73',
    php_version: '7.3',
  },
];

contexts.forEach(context => {
  walkSync('src', { directories: false }).forEach(file => {
    const template = handlebars.compile(fs.readFileSync(`src/${file}`, 'utf8'));
    const output = template(context);
    fs.outputFileSync(`${context.name}/${file}`, output, 'utf8');
  });
});
