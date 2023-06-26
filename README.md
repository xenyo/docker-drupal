# docker-drupal

A full-featured Docker environment for developing Drupal projects.

## Features

- Separate Docker Compose project per PHP version
- Multiple virtual hosts per container

## Prerequisites

- Git
- Docker Desktop (with WSL 2 backend if running on Windows)

## Getting started

### 1. Clone the repository

Open a terminal and clone this repository to a convenient location:

```
git clone git@github.com:xenyo/docker-drupal.git
```

`cd` into the repository:

```
cd docker-drupal
```

### 2. Build and start the container

There is a separate folder for each PHP version available. `cd` into the folder
you want to use:

```
cd drupal-php81
```

Then build and start the container by running this command:

```
docker compose up -d
```

> If the build process gets stuck or takes too long, you may want to try an
> alternative Ubuntu mirror. To do so, select a mirror from
> https://launchpad.net/ubuntu/+archivemirrors and add it to a `.env` file in the
> same folder as `docker-compose.yml`:
> 
> **drupal-php81/.env**
> 
> ```
> UBUNTU_MIRROR=http://your.custom.mirror/ubuntu/
> ```

### 3. Connect to the container in the terminal

Run this command in the terminal to connect to the container:

```
docker compose exec drupal bash
```

### 4. Generate SSH keys in the container and add to your GitHub account

Run this command to generate a public/private key pair:

```
ssh-keygen
```

Keep pressing enter until finished.

Then, run this command to output your public key:

```
cat ~/.ssh/id_rsa.pub
```

Copy the entire output to https://github.com/settings/ssh/new


### 5. Clone an existing project or create a new project

For example, run this command to clone a project called `example`:

```
git clone git@github.com:xenyo/example.git
```

Or run this command to create a new project called `example`:

```
composer create-project drupal/recommended-project example
```

### 6. Add a virtual host

To add a virtual host to point to your project, create a `.conf` file in
`/etc/apache2/sites-available`.

For example, run this command to create `example.conf`:

```
nano /etc/apache2/sites-available/example.conf
```

Insert the following text:

```
<VirtualHost *:80>
    ServerName example
    DocumentRoot "/var/www/example/web"
</VirtualHost>
```

Then, run this command to enable the virtual host:

```
a2ensite example
```

Then, run this command to restart apache:

```
service apache2 restart
```

### 7. Edit your hosts file

Return to the host machine and add the following to your hosts file:

```
127.0.0.1 example
```

You can find the hosts file at the following path:

| OS | Hosts file |
| - | - |
| Windows | C:\Windows\System32\drivers\etc\hosts |
| Mac, Linux | /etc/hosts |


### 8. Import database (if you have)

Run this command to create an empty database named `example`:

```
mysql -hmariadb -e "create database example;"
```

Use an SFTP client to upload your SQL dump to the container (see below).

Then run this command to import the database:

```
mysql -hmariadb example < example.sql
```

### 9. Open the site in the browser

For example, go to http://example:8081 to confirm everything is set up correctly.

## VS Code

1. Install the *Dev Containers* extension.
2. Open the Remote Explorer view and select Dev Containers at the top of the panel.
3. Right click your container and select Attach in Current Window.

## SFTP client

You can connect to the container using a SFTP client such as WinSCP using the
following credentials:

| Host | Port | Username | Password |
| - | - | - | - |
| localhost | See below | root | root |

## Ports

| | Apache | MariaDB | SSH/SFTP |
| - | - | - | - |
| drupal-php81 | 8081 | 3081 | 2281 |
| drupal-php80 | 8080 | 3080 | 2280 |
| drupal-php74 | 8074 | 3074 | 2274 |
| drupal-php73 | 8073 | 3073 | 2273 |

## Volumes

The following paths are mounted as Docker volumes to preserve data when the container is rebuilt:

| Path | Description |
| - | - |
| /var/www | Project source code |
| /root | Home directory of root user |
| /etc/apache2/sites-available | Virtual host config files |
| /etc/apache2/sites-enabled | Enabled virtual hosts |

## File permissions

The `root` and `www-data` users have mutual group membership. This means that
the `root` user is in the `www-data` group and the `www-data` user is in the
`root` group.

Files in /var/www can be owned by either `root` or `www-data`. Just make sure
that your files have read and write permissions for user and group. Run the
following command to fix permissions:

```
chmod -R ug+rw /var/www
```

## Drush

To use `drush` in your project without having to type `vendor/bin/drush`, add
a `.envrc` file to the root of your project. For example:

**/var/www/example/.envrc**

```
PATH_add vendor/bin
```

Then allow direnv to load the `.envrc` file:

```
direnv allow
```

## Updating

Pull the latest version:

```
git pull
```

Rebuild containers. For example, to rebuild the PHP 8.1 container:

```
cd drupal-php81
docker compose up -d --build
```

## Development

The Node.js script `index.js` generates files from `src` to `drupal-php*`.

Install npm dependencies:

```
npm install
```

Watch src for changes:

```
npm run watch
```
