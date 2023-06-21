# docker-drupal

## Create virtual hosts configuration

Create `httpd-vhosts.conf` in the `apache` folder.

```
<VirtualHost *:80>
    ServerName example
    DocumentRoot "/var/www/example/web"
</VirtualHost>
```
