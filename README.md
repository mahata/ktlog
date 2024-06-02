[![CI/CD Status](https://github.com/mahata/ktlog/actions/workflows/ci-cd-main.yml/badge.svg)](https://github.com/mahata/ktlog/actions/workflows/ci.yml)

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

Together with Backend, the entire system will start serving at http://localhost:5173

## Demo

The latest version of this service is available here: [https://ktlog.mahata.org/](https://ktlog.mahata.org/) However, please note that this is a "DEMO" site and I do NOT guarantee data permanence or anything like that.
