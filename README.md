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

### 2. Build and start the container

For example, to start the PHP 8.1 container:

```
cd drupal-php81
docker compose up -d
```

If the build process gets stuck or takes too long, you may want to try an
alternative Ubuntu mirror. To do so, select a mirror from
https://launchpad.net/ubuntu/+archivemirrors and add it to a `.env` file:

```
UBUNTU_MIRROR=http://your.custom.mirror/ubuntu/
```

### 3. Open the container in the terminal

```
docker compose exec drupal bash
```

### 4. Generate SSH keys in the container and add to your GitHub account

```
ssh-keygen
```

Keep pressing enter until finished.

```
cat ~/.ssh/id_rsa.pub
```

Copy output to https://github.com/settings/ssh/new


### 5. Clone your project to the container

For example, to clone a project called `example`:

```
cd /var/www
git clone git@github.com:xenyo/example.git
```

### 6. Add virtual hosts

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

### 7. Edit your hosts file

For example, add the following to your hosts file:

```
127.0.0.1 example
```

### 8. Open the site in the browser

For example, open `http://example:8081` to confirm everything is set up correctly.

## Opening the container in VS Code

1. Install the *Dev Containers* extension.
2. Open the Remote Explorer view and select Dev Containers.
3. Right click your container and select Attach in Current Window.

## Accessing files using a SFTP client

You can connect to the container using a SFTP client such as WinSCP using the
following credentials:

| Username | Password |
| - | - |
| root | root |

## Default ports

| | Apache | MariaDB | SSH |
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
