# PingChat

![home](./images/Screenshot%20from%202023-02-26%2000-37-43.png)

![login](./images/Screenshot%20from%202023-02-26%2011-45-19.png)

![signup](./images/Screenshot%20from%202023-02-26%2011-45-25.png)

## Table Of Contents
- [PingChat](#pingchat)
  - [Table Of Contents](#table-of-contents)
  - [Description](#description)
    - [Language(s) Used](#languages-used)
  - [Running the application](#running-the-application)
    - [Backend API](#backend-api)
      - [npm](#npm)
      - [yarn](#yarn)
      - [pnpm](#pnpm)
    - [Client](#client)
      - [npm](#npm-1)
      - [yarn](#yarn-1)
      - [pnpm](#pnpm-1)
    - [Socket](#socket)
      - [npm](#npm-2)
      - [yarn](#yarn-2)
      - [pnpm](#pnpm-2)
    - [Folder structure](#folder-structure)


## Description

PingChat is a Realtime chat application where users can talk to strangers anonymously from anywhere in the world. PingChat was created by [Ernest Wambua](http://github.com/tallninja) using the popular MERN stack.

### Language(s) Used

- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://mongodb.com)
- [React](https://reactjs.org/) with ([Typescript](https://www.typescriptlang.org/)) and [Vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Express JS](http://expressjs.com/)
- [NodeJS](https://nodejs.org)

## Running the application

In case you encounter any issues when running the application, feel free to reach me via [ernestwambua2@gmail.com]()

First of all you need to clone the contents of this repository using git.

```text
git clone https://github.com/tallninja/Ping-Chat
```

### Backend API

This is the backend API of the application. It is responsible for handling all the business logic.

From the root folder, move to the **api** directory.

Next you need to install the dependencies before running the API. You can use a package manager of your own choosing.

#### npm

```text
npm install
```

#### yarn

```text
yarn
```

#### pnpm

```
pnpm install
```

After all the dependencies have been installed, you need to create a **.env** file at the root of the **api** directory. This file contains some of the environment variables used in the API. The file should contain...

```text
BASE_URL=YOUR_DOMAIN eg 'https://my-domain.com' or 'http://localhost' or 'http://127.0.0.1'
MONGO_URI=YOUR_MONGO_URI
SESSION_SECRET=YOUR_AUTH_SESSION_SECRET eg 'jhskdkasdsakbn'
```

Now that everything is set up, you can run the API using the following command...

```text
npm run dev
```

### Client

This is the frontend of the application. This is where the users interract with the application.

From the root folder move to the **client** directory.
Just like the backend API we also need to install client dependencies.

#### npm

```text
npm install
```

#### yarn

```text
yarn
```

#### pnpm

```
pnpm install
```

After all the dependencies have been installed, you need to create a **.env** file at the root of the **client** directory. This file contains some of the environment variables used in the client. The file should contain...

```text
VITE_API_URL=YOUR_API_URL eg 'http://localhost:5000' this is the URL to the backend API
```

Now that everything is set up, you can run the client using the following command...

```text
npm run dev
```

### Socket

This is the socket server. It is responsible for the realtime communication between users.
From the root folder move to the **socket** directory and install the dependencies

#### npm

```text
npm install
```

#### yarn

```text
yarn
```

#### pnpm

```
pnpm install
```

After all the dependencies have been installed, you need to create a **.env** file at the root of the **socket** directory. This file contains some of the environment variables used in the client. The file should contain...

```text
CLIENT_URL=YOUR_CLIENT_URL eg 'http://localhost:5173' this is the URL to the client application
```

Now that everything is set up, you can run the API using the following command...

```text
npm start
```


### Folder structure

```text
.
├── api
│   ├── node_modules
│   ├── nodemon.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── requests.http
│   ├── src
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── conversation.controller.ts
│   │   │   ├── index.ts
│   │   │   ├── message.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   └── index.ts
│   │   ├── models
│   │   │   ├── Conversation.ts
│   │   │   ├── index.ts
│   │   │   ├── Message.ts
│   │   │   └── User.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── conversation.routes.ts
│   │   │   ├── index.ts
│   │   │   ├── message.routes.ts
│   │   │   └── user.routes.ts
│   │   └── server.ts
│   └── tsconfig.json
├── client
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.cjs
│   ├── public
│   │   ├── smartphone-mobile-alert-SBA-300463374-preview.mp3
│   │   └── vite.svg
│   ├── src
│   │   ├── api
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── BrandLogo.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ConvoList.tsx
│   │   │   ├── Convo.tsx
│   │   │   ├── index.ts
│   │   │   ├── MessagePrompt.tsx
│   │   │   ├── PersisLogin.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── SideMenu.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── UsersList.tsx
│   │   ├── context
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ConversationContext.tsx
│   │   │   ├── index.ts
│   │   │   └── SocketContext.tsx
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useAuthContext.ts
│   │   │   ├── useConvoContext.ts
│   │   │   └── useSocketContext.ts
│   │   ├── index.sass
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── index.ts
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.cjs
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── images
├── index.html
├── README.md
└── socket
    ├── index.ts
    ├── node_modules
    ├── package.json
    ├── pnpm-lock.yaml
    └── tsconfig.json
```