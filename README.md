# render-blog

## Project Overview

This is an implementation of a blog platform, crafted using Spring Boot with Kotlin, and React with TypeScript.

## Prerequisites

* Java 17 or higher
* Node 20 or higher

## Local Development Instructions

This repository includes both frontend and backend implementations. Due to the backend using the artifact generated from the `frontend/` directory, the following commands are essential to run the entire service locally:

### Frontend Instructions

By running the following commands, React will start monitoring changes in the `frontend/` directory. If any changes are detected, React will build the artifact and copy it over to the `backend/` directory.

```shell
$ cd frontend
$ npm run build-watch
```

### Backend Instructions

Execute the following commands to boot up the Spring Boot process. Once it's up, you can access it via: http://localhost:8080.

```
$ cd backend
$ ./gradlew bootRun
```
