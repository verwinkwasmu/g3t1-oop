# g3t1-oop

# Backend - Starting the Spring Boot Server

This guide will provide instructions on how to start our backend springboot monolithic server.

## Prerequisites
1. Install [Java](https://java.com/en/download/)
2. Install [Maven](https://maven.apache.org/install.html)

## Recommended Visual Studio Code Extensions
1. Install the [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack)
2. Install [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

## Running the Project
1. Open the terminal in Visual Studio Code
2. Navigate to the project's root directory
3. Run the command `mvn clean install` to build the project.
4. Run the command `./mvnw clean install spring-boot:run` or `./mvnw spring-boot:run` to start the application.

## Running Tests
1. Open the terminal in Visual Studio Code
2. Navigate to the project's root directory
3. Run the command `mvn clean test` to run all tests
4. Run the command `mvn clean test jacoco:report` to generate coverage report which can be found in the target/site/jacoco directory

## Dependencies/Plugins used
1. [Project Lombok](https://projectlombok.org/)
2. [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
3. [Spring Web](https://spring.io/projects/spring-web)
4. [Jacoco](https://www.jacoco.org/jacoco/)
5. [Spring Boot DevTools](https://spring.io/projects/spring-boot-devtools)

***

# Frontend - Starting the React Application

This guide will provide instructions on how to start our backend springboot monolithic server.

## Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [NPM](https://www.npmjs.com/get-npm) package manager

## Recommended Visual Studio Code Extensions
1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
4. [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
7. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

## Running the Project
1. Open the terminal in Visual Studio Code
2. Navigate to the app/
3. Run the command `npm install` to install project dependencies.
4. Run the command `npm run dev` to start the application.
