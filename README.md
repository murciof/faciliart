# README

## Main dependencies

### Back-end

**Ruby:** 3.2.2

**Rails:** 7.0.4

### Front-end

**TailwindCSS:** 3.3.3

**DaisyUI:** 2.51.5

**p5.js:** 1.7.0

### Database

**PostgreSQL**

## Setup

In the project folder, execute these commands:

```console
$ bundle install # For Ruby gems
$ pnpm install # or npm install -- For NPM modules
$ bundle exec yard gems # for solargraph indexing
```

After that, you need to create a PostgreSQL database. For that, you need to install the software using your distro's repository (like `sudo pacman -S postgresql` in Arch Linux) or, if you are on Windows, you need to download it on the [official website](https://www.postgresql.org/download/).

Afterwards, it's required to create a user in the postgres server with the same name of your user account in the computer:

```sql
postgres=# CREATE USER ${your_username}
```

Henceforth, it's needed to create a database with the name `tcc_development` with your new database account:

```sql
postgres=# CREATE DATABASE tcc_development OWNER ${your_username}
postgres=# \q
```

After that, you can execute the database migration without errors:
```console
$ rails db:migrate
```

Later, to execute the server, just run:

```console
$ ./bin/dev
```

But, if you are on Windows, the step above will fail. To avoid this, you need to run the commands located in `Procfile.dev` on your console.

If you are using an environment like [MSYS2](https://www.msys2.org/), open two terminals and run a command on each one:

**Rails server:**
```console
$ ./bin/rails server -p 3000
```
**Tailwind auto update:**
```console
$ ./bin/rails tailwindcss:watch
```
