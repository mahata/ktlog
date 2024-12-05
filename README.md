[![CI - frontend Status](https://github.com/mahata/ktlog/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/mahata/ktlog/actions/workflows/ci-frontend.yml)
[![CI - backend Status](https://github.com/mahata/ktlog/actions/workflows/ci-backend.yml/badge.svg)](https://github.com/mahata/ktlog/actions/workflows/ci-backend.yml)

# ktlog

## Project Overview

This is an implementation of a blog platform, crafted using Spring Boot with Kotlin, and React with TypeScript. It's still under heavy development (meaning it's almost unusable right now).

## Prerequisites

* Java 21 or higher
* Node 20 or higher
* Docker

## Local Development Instructions

To streamline the setup process and ensure consistency across platforms, we utilize Docker for our development environment. This contains all the necessary third-party software required for this project.

Run the following command in the project's root directory:

```
$ docker compose up
```

Also, the app requires service domain except localhost so that login cookie works. Let's add a line like following in `/etc/hosts`:

```
127.0.0.1	ktlog.local
```

It's recommended to set up a pre-commit hook to ensure code quality. Run the following commands to set up the pre-commit hook:

```shell
mkdir -p .git/hooks
echo "make -j 4 pre-commit" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```


### Backend Instructions

Execute the following commands to boot up the Spring Boot process.

```
$ cd backend
$ ./gradlew bootRun
```

### Frontend Instructions

By running the following commands, React will start monitoring changes in the `frontend/` directory. If any changes are detected, React will automatically restart to reflect the changes.

```shell
$ cd frontend
$ npm i
$ npm run dev
```

Together with Backend, the entire system will start serving at http://ktlog.local:5173
