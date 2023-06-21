FROM ubuntu

# Set apt mirror
RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//mirror:\/\/mirrors.ubuntu.com\/mirrors.txt/' /etc/apt/sources.list

# Install apt packages
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y \
  build-essential \
  ca-certificates \
  curl \
  direnv \
  git \
  less \
  locales \
  mariadb-client \
  nano \
  openssh-client \
  patch \
  php7.3-cli \
  rename \
  rsync \
  software-properties-common \
  tzdata \
  unzip \
  vim \
  wget \
  zip

# Install node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash
RUN apt-get install -y nodejs
RUN npm i -g npm
RUN npm config set -g audit false
RUN npm config set -g fund false

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer config --global use-parent-dir true
ENV COMPOSER_IGNORE_PLATFORM_REQS=1

# Set locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Set editor
ENV EDITOR=vim

# Set timezone
ENV TZ=Asia/Hong_Kong

# Set up root user
RUN echo 'root:root' | chpasswd
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> /root/.bashrc
RUN echo 'umask 0002' >> /root/.bashrc
RUN echo 'eval "$(direnv hook bash)"' >> /root/.bashrc

# Set internal volumes
VOLUME /root/.ssh
VOLUME /root/.vscode-server

ENTRYPOINT [ "sleep", "infinity" ]
