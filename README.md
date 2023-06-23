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

```
git clone git@github.com:xenyo/docker-drupal.git
```

### 2. Create a .env file and enter your personal details

For example, create `drupal-php81/.env`:

```
GIT_AUTHOR_NAME=Your Name
GIT_AUTHOR_EMAIL=example@example.com
```

The default mirror is http://mirror.xtom.com.hk/ubuntu/. To use a different
mirror, add:

```
UBUNTU_MIRROR=http://your.custom.mirror/ubuntu/
```

You can choose a mirror from https://launchpad.net/ubuntu/+archivemirrors

### 3. Build and start the container

For example, to start the PHP 8.1 container:

```
cd drupal-php81
docker compose up -d
```

### 4. Open the container in the terminal

```
docker compose exec drupal bash
```

### 5. Generate SSH keys in the container and add to your GitHub account

```
ssh-keygen
```

Keep pressing enter until finished.

```
cat ~/.ssh/id_rsa.pub
```

Copy output to https://github.com/settings/ssh/new


### 6. Clone your project to the container

For example, to clone a project called `example`:

```
cd /var/www
git clone git@github.com:xenyo/example.git
```

### 7. Add virtual hosts

For example, create `/etc/apache2/sites-available/example.conf`:

```
<VirtualHost *:80>
    ServerName example
    DocumentRoot "/var/www/example/web"
</VirtualHost>
```

Enable the virtual host and restart apache:

```
a2ensite example
service apache2 restart
```

### 8. Edit your hosts file

For example, add the following to your hosts file:

```
127.0.0.1 example
```

### 9. Open the site in the browser

For example, open `http://example:8081` to confirm everything is set up correctly.

## Opening the container in VS Code

1. Install the *Dev Containers* extension.
2. Open the Remote Explorer view and select Dev Containers.
3. Right click your container and select Attach in Current Window.

## Default ports

| | Apache | MariaDB | SSH |
| - | - | - | - |
| drupal-php81 | 8081 | 3081 | 2281 |
| drupal-php80 | 8080 | 3080 | 2280 |
| drupal-php74 | 8074 | 3074 | 2274 |
| drupal-php73 | 8073 | 3073 | 2273 |

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

Your project code and database will not be affected.

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
