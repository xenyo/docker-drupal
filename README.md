# docker-drupal

A full-featured Docker environment for developing Drupal projects.

## Features

- Separate container per PHP version
- Multiple virtual hosts per container

## Prerequisites

- Git
- Docker Desktop (with WSL 2 backend if running on Windows)

## Getting started

### 1. Clone the repository

```
git clone git@github.com:xenyo/docker-drupal.git
```

### 2. Create variables.env and enter your personal details

```
GIT_AUTHOR_NAME=Your Name
GIT_AUTHOR_EMAIL=example@example.com
```

### 3. Build and start the container

For example, to start the PHP 8.1 container:

```
docker compose up -d php81
```

### 4. Open the container in the terminal

```
docker compose exec php81 bash
```

### 5. Generate SSH keys and add to your GitHub account

```
ssh-keygen
```

Keep pressing enter until finished.

```
cat ~/.ssh/id_rsa.pub
```

Copy output to https://github.com/settings/keys


### 6. Clone your project to the container

For example, to clone a project called `example`:

```
cd /var/www
git clone git@github.com:xenyo/example.git
```

### 7. Add virtual hosts

For example, create `containers/php81/vhosts/example.conf`:

```
<VirtualHost *:80>
    ServerName example
    DocumentRoot "/var/www/example/web"
</VirtualHost>
```

Restart the container for the new virtual hosts to take effect.

```
docker compose restart php81
```

## Updating

Pull the latest version:

```
git pull
```

Rebuild containers. For example, to rebuild the PHP 8.1 container:

```
docker compose up -d php81 --build
```

Your project code and database will not be affected.

## Development

The Node.js script `index.js` generates files from `src` to `containers/*`.

Install npm dependencies:

```
npm install
```

Watch src for changes:

```
npm run watch
```
