# Hello React

Una app para tomar notas, hecha en React y usando el _backend_ de [hello-crud](https://github.com/santiagotrini/hello-crud).

## ¿Qué es React?

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Creando el proyecto

En el artículo anterior creamos el _backend_ para una app de tomar notas.
Ese va a ser nuestro punto de partida.
Creamos una carpeta para este proyecto y copiamos todo lo que teníamos en [hello-crud](https://github.com/santiagotrini/hello-crud).

```console
$ mkdir hello-react
$ cd hello-react
$ git init
$ npm init -y
$ echo node_modules > .gitignore
$ echo web: npm start > Procfile
$ touch index.js
$ mkdir api
$ mkdir api/routes api/models
$ touch api/routes/note.js api/models/Note.js
```

Copien el código que ya tenían en los tres archivos de JavaScript: `index.js`, `api/models/Note.js` y `api/routes/note.js`.

Instalamos los paquetes de npm.

```console
$ npm i -D nodemon
$ npm i express morgan mongoose cors
```

Por último agregamos los scripts al `package.json`.

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

Antes de empezar con el _frontend_ probamos que todo funcione como antes.

```console
$ npm run dev
```

Si todo anduvo bien entonces ahora sí podemos crear la aplicación de React. Para eso vamos a usar [Create React App](https://create-react-app.dev/docs/getting-started/) que es una herramienta de línea de comandos para crear rápidamente una nueva app de React.

```console
$ npx create-react-app client
$ cd client
$ npm start
```

Con Create React App nos ahorramos el dolor de cabeza de tener que configurar Webpack y otras cosas necesarias para que todo funcione.

A partir de ahora vamos a trabajar en el directorio `client` donde va a estar el código relativo al _frontend_. Si todo anduvo bien deberían ver en `localhost:3000` el logo de React girando.

## Concurrently

Primero tenemos un problema que resolver, si ejecutamos `npm start` desde el directorio `client` solo tenemos el _frontend_ ejecutándose.

Si hacemos `npm start` o `npm run dev` desde la carpeta del proyecto en cambio tenemos el _backend_. Queremos las dos cosas juntas.

Lo ideal sería ejecutar `npm run dev` desde el directorio principal y tener las dos cosas juntas. Por suerte existe un paquete en npm que resuelve este problema, lo instalamos. Pero lo hacemos desde el directorio raíz del proyecto, es decir parados en `hello-react`.

```console
[~/hello-react]$ npm i -D concurrently
```

Para usar Concurrently modificamos el `package.json` del _backend_.
La sección de scripts en `hello-react/package.json` tiene que quedar así.

```json
"scripts": {
  "server": "node index.js",
  "client": "npm start --prefix client",
  "start": "node index.js",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

Entonces con `npm run dev` ahora tenemos el cliente y el servidor al mismo tiempo. Excepto por un problema, tanto servidor como cliente quieren recibir conexiones en el puerto 3000. Lo arreglamos cambiando el puerto en `hello-react/index.js` por 4000 o alguna otra cosa.

El último paso para que todo funcione es ir a `client/package.json` y agregar la siguiente propiedad:

```json
"proxy": "http://localhost:4000",
```

Esto es necesario para que el cliente pueda realizar peticiones a la API del server. Ahora sí ya estamos listos para empezar con el código del _frontend_. Veamos un poco más en detalle los archivos que Create React App creó en el directorio `client`.

## Estructura del proyecto

El directorio `client` se podría considerar un proyecto de NodeJS dentro de nuestro proyecto original que era el server para esta aplicación web. Dentro de `client` tenemos también un `package.json`, podemos instalar dependencias para el _frontend_ que irán a `client/node_modules`.

Después de eliminar algunos archivos innecesarios tenemos lo siguiente dentro de `client`.

```
.
├── node_modules
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── index.js
    └── serviceWorker.js
```

En general vamos a editar y crear archivos en `src`, por _source code_ o código fuente. Menos frecuentemente puede ser que editemos algo en `public`.

La cosa funciona así, el archivo `client/index.js` es el punto de entrada del _frontend_. En general ese archivo lo que hace es montar el componente que representa a toda la app en un `div` con `id="root"` en `public/index.html`. El componente principal de la app está definido generalmente en un archivo llamado `App.js` que pueden encontrar en el directorio `src`.
