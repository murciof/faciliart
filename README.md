<div align="center">
<img src="app/assets/images/brand.svg" alt="Faciliart" height="72">
<p style="font-size:22px"></p>
<p><strong>Generative art can be accessible</strong></p>

<div align="center">
  
  [![Preview](https://img.shields.io/badge/Preview-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://facili.art)

</div>

<div align="center">
  
![Ruby](https://img.shields.io/badge/Ruby-3.2.2-444444?style=for-the-badge&logo=ruby&labelColor=CC342D)
![Ruby on Rails](https://img.shields.io/badge/Rails-7.0.4-444444?style=for-the-badge&logo=rubyonrails&labelColor=D30001)
![Javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-444444?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=06B6D4)
![DaisyUI](https://img.shields.io/badge/DaisyUI-2.51.5-444444?style=for-the-badge&logo=daisyui&labelColor=5A0EF8)
![p5.js](https://img.shields.io/badge/p5.js-1.6.0-444444?style=for-the-badge&logo=processingfoundation&labelColor=006699)
![p5.js-svg](https://img.shields.io/badge/p5.js_svg-1.5.1-444444?style=for-the-badge&logo=processingfoundation&labelColor=006699)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

</div>

# What is Faciliart?

Faciliart is a social network made on Ruby on Rails that allows the user to generate art using the web interface.

# Features

* 🎨 Generative art creation without coding via UI with the selection of pre-programmed patterns and parameters
* 🖥️ Art visualization page with order and comments section
* 🖥️ Art auto-resizing on visualization page without loss of quality using the [p5js-svg](https://github.com/zenozeng/p5.js-svg) library
* ✍️ User login and registration using the [Devise](https://github.com/heartcombo/devise) library
* 🧑 Profile page with arts, comments, orders and earnings of each user
* 🔎 Platform-wide search for users and arts
* 🛍️ Order creation, considering informations like item price and artist rate

# Setup

In the project folder, execute these commands:

```console
$ bundle install # For Ruby gems
$ pnpm install # or npm install -- For NPM modules
$ bundle exec yard gems # for solargraph indexing
```

After that, you need to create a PostgreSQL database. For that, you need to install the software using your distro's repository (like `sudo pacman -S postgresql` in Arch Linux) or, if you are on Windows, you need to download it on the [official website](https://www.postgresql.org/download/).

Afterwards, it's required to create a user in the postgres server with the same name of your user account in the computer:

```sql
CREATE USER ${your_username};
```

Henceforth, it's needed to create a database with the name `tcc_development` with your new database account:

```sql
CREATE DATABASE tcc_development OWNER ${your_username};
```

After that, you can execute the database migration without errors:
```console
$ rails db:migrate
```

Later, to execute the server, just run:

```console
$ ./bin/dev
```

With the application running, you can create an admin account by simply registering a new user account. The platform assigns admin privileges for the first registered user.

# Troubleshooting

## `./bin/dev` not working on Windows

To avoid this error on Windows, you need to run the commands located in `Procfile.dev` on your console.

If you are using an environment like [MSYS2](https://www.msys2.org/), open two terminals and run a command on each one:

**Rails server:**
```console
$ ./bin/rails server -p 3000
```
**Tailwind auto update:**
```console
$ ./bin/rails tailwindcss:watch
```

## Error installing gems on Windows

This error occurs when the user decides to do a Ruby system installation instead of a user installation.

To fix that, when running the Ruby Windows installer, **don't install Ruby system-wide** and, after that, run `sysdm.cpl` and add an User Variable called `GEM_HOME`, pointing to your install directory and, also, is required to add a new entry on `PATH` variable pointing to `%GEM_HOME%\bin`.

## PostgreSQL authentication error

This error happens when the PostgreSQL user doesn't have a password and, also, the project wasn't configured on `config/database.yml` to connect to a database with a password.

If you are on a local machine and want to access the database on your system without a password, you can edit your PostgreSQL `pg_hba.conf` to alter the authentication method from `scram-sha-256` to `trust`:

**`pg_hba.conf` - Before**
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     scram-sha-256
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     scram-sha-256
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
```
**`pg_hba.conf` - After**
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
```
