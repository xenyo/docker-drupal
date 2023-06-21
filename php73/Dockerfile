FROM ubuntu

# Set apt mirror
RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//mirror:\/\/mirrors.ubuntu.com\/mirrors.txt/' /etc/apt/sources.list

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
RUN apt-get update
RUN apt-get install -y \
  php7.3 \
  php7.3-apcu \
  php7.3-bcmath \
  php7.3-bz2 \
  php7.3-cli \
  php7.3-common \
  php7.3-curl \
  php7.3-fpm \
  php7.3-gd \
  php7.3-iconv \
  php7.3-intl \
  php7.3-mbstring \
  php7.3-mysql \
  php7.3-opcache \
  php7.3-readline \
  php7.3-xdebug \
  php7.3-xml \
  php7.3-zip

# Install node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash
RUN apt-get install -y nodejs
RUN npm i -g npm
RUN npm config set -g audit false
RUN npm config set -g fund false

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer config --global use-parent-dir true

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
COPY apache2.conf /etc/apache2/apache2.conf
RUN a2enmod proxy_fcgi
RUN a2enmod rewrite
RUN a2enconf php7.3-fpm
RUN chmod ug+w /var/www
RUN rm -r /var/www/html
RUN service apache2 start

# Configure php
COPY php.ini /etc/php/7.3/fpm/conf.d/30-docker.ini
RUN service php7.3-fpm start

# Configure git
RUN git config --global init.defaultBranch main
RUN git config --global credential.helper store
RUN git config --global pull.rebase false

# Configure sshd
COPY sshd.conf /etc/ssh/sshd_config.d/sshd.conf
RUN service ssh start

# Set up root user
RUN echo 'root:root' | chpasswd
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> /root/.bashrc
RUN echo 'umask 0002' >> /root/.bashrc
RUN echo 'eval "$(direnv hook bash)"' >> /root/.bashrc
RUN usermod -a -G www-data root
RUN usermod -a -G root www-data

ENTRYPOINT [ "supervisord" ]
