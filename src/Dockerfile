FROM ubuntu

# Set apt mirror
ARG UBUNTU_MIRROR
RUN sed -i s#http://archive.ubuntu.com/ubuntu/#$UBUNTU_MIRROR# /etc/apt/sources.list

# Install base packages
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y \
  build-essential \
  ca-certificates \
  cron \
  curl \
  direnv \
  git \
  less \
  locales \
  mariadb-client \
  nano \
  patch \
  rename \
  rsync \
  software-properties-common \
  ssh \
  supervisor \
  tzdata \
  unzip \
  vim \
  wget \
  zip

# Add ppas
RUN add-apt-repository ppa:ondrej/apache2 -y
RUN add-apt-repository ppa:ondrej/php -y
RUN apt-get update

# Install apache
RUN apt-get install -y \
  apache2 \
  libapache2-mod-fcgid

# Install php
RUN apt-get install -y \
  php{{php_version}} \
  php{{php_version}}-apcu \
  php{{php_version}}-bcmath \
  php{{php_version}}-bz2 \
  php{{php_version}}-cli \
  php{{php_version}}-common \
  php{{php_version}}-curl \
  php{{php_version}}-fpm \
  php{{php_version}}-gd \
  php{{php_version}}-iconv \
  php{{php_version}}-intl \
  php{{php_version}}-mbstring \
  php{{php_version}}-mysql \
  php{{php_version}}-opcache \
  php{{php_version}}-readline \
  php{{php_version}}-xdebug \
  php{{php_version}}-xml \
  php{{php_version}}-zip

# Install node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash
RUN apt-get install -y nodejs
RUN npm i -g npm
RUN npm config set -g audit false
RUN npm config set -g fund false

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer config --global use-parent-dir true

# Install Drush Launcher
RUN wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar
RUN chmod +x drush.phar
RUN mv drush.phar /usr/local/bin/drush

# Set locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Set editor
ENV EDITOR=vim

# Set timezone
ENV TZ=Asia/Hong_Kong

# Configure supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Configure apache
COPY apache2.conf /etc/apache2/conf-available/docker.conf
RUN a2enconf docker
RUN a2enmod proxy_fcgi
RUN a2enmod rewrite
RUN a2enconf php{{php_version}}-fpm
RUN chmod ug+w /var/www
RUN service apache2 start

# Configure php
COPY php.ini /etc/php/{{php_version}}/fpm/conf.d/30-docker.ini
RUN service php{{php_version}}-fpm start

# Configure git
RUN git config --global init.defaultBranch main
RUN git config --global credential.helper store
RUN git config --global pull.rebase false

# Configure sshd
COPY sshd.conf /etc/ssh/sshd_config.d/sshd.conf
RUN service ssh start

# Set up root user
ENV DIRENV_LOG_FORMAT=""
RUN echo 'root:root' | chpasswd
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> /root/.bashrc
RUN echo 'umask 0002' >> /root/.bashrc
RUN echo 'eval "$(direnv hook bash)"' >> /root/.bashrc
RUN usermod -a -G www-data root
RUN usermod -a -G root www-data

WORKDIR /var/www
ENTRYPOINT [ "supervisord" ]
