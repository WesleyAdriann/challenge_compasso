Challenge Compasso - Pokedex
===
## Description

This is a solution to Compasso Challange 

This solution was created using the flux architecture with Redux, and I've used multiple libraries like React Navigation for screen navigation, styled components to create style and more.

The application contains 2 screen, first to list all pokemons in infinity scroll with search filter and selection per pokemon generation. The second screen is detail of one pokemon, with description, technical features, status and evolution chain

## Hierarchy

- **/build** directory created after execute command build, where is located files for production;
- **/code** directory where development code is located;
    - **/android** directory where the android files is located;
    - **/ios** directory where the ios files is located;
    - **/src** directory where the develop files is located;
      - **/assets** directory where static files like fonts and images is located;
      - **/components** directory where the react components is located;
      - **/services** directory where the files related to services used in the application will be created, for example HTTP requests;
      - **/screens** directory where de pages is located;
      - **/settings** directory where project configuration and texts is located;
      - **/store** directory where redux configuration is located;
          - **/actions** directory where redux actions is located;
          - **/actionsTypes** directory where files to configure the actions types to actions;
          - **/reduces** directory where reducers is located;
      - **/style** directory where global style, fonts imports and colors is located;
      - **/utils** directory where files make it easy to develop;

## Prerequisites

- [NodeJS](https://nodejs.org)
- [npm](https://www.npmjs.com)
- [React Native Cli](https://www.npmjs.com/package/react-native-cli)
- [SDK Android](https://developer.android.com/studio)
- [ADB](https://developer.android.com/studio/command-line/adb.html)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/)

## Usage
Configures basic workstation with React Native Cli  
- [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started)

In the directory, install the dependencies
```bash
npm install
```
In the first time install the application in emulator
```bash
react-native run-android
```
Await for application open in android emulator.

In others times only execute
```
react-native start
```
Open application in android emulator.

## Docker
Docker will be generate new apk in ./build/release/app-release.apk

#### ARG's
- **android_home** - path to android_home
```yml
ARG android_home=/opt/android/sdk
```
- **sdk_version** - version of android sdk tools
```yml
ARG sdk_version=sdk-tools-linux-4333796.zip
```

### Run with Docker
In the directory with Dockerfile, builds the image
```bash
# docker image build -t <IMAGE_NAME> <DOCKERFILE_DIRECTORY>
docker image build -t <IMAGE_NAME> .
```

Run the Container
```bash
#  docker run <IMAGE_NAME> -v <LOCAL DIRECTORY>:<CONTAINER DIRECTORY>
docker run <IMAGE_NAME> -v ./build/:/app/android/app/build/outputs/apk/
```

### Run with Docker Compose
In the directory with docker-compose.yml, run
```bash
docker-compose up --build
```
or
```bash
docker-compose up
```
## Built With

- [Axios](https://github.com/axios/axios)
- [React Native](https://reactnative.dev/)
- [ESLint](https://eslint.org)
- [Standard Js](https://standardjs.com/)
- [Prop Types](https://www.npmjs.com/package/prop-types)
- [React Redux](https://react-redux.js.org)
- [React Navigation V5](https://reactnavigation.org/)
- [Redux](https://redux.js.org)
- [Styled Components](https://www.styled-components.com)

## Authors
- Wesley Adriann
  - Github: [wesleyadriann](https://github.com/WesleyAdriann)
  - LinkedIn: [in/wesleyadriann](https://www.linkedin.com/in/wesleyadriann/)

## Project Status

- **Finalized**

## URL Project Reference

- [https://github.com/WesleyAdriann/challenge_compasso](https://github.com/WesleyAdriann/challenge_compasso)
