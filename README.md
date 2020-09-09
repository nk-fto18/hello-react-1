# Hello React

Una app para tomar notas, hecha en React y usando el _backend_ de [hello-crud](https://github.com/santiagotrini/hello-crud). Demo en [Heroku](https://react-notas.herokuapp.com).

## ¿Qué es React?

React es un _framework_ de JS para crear aplicaciones webs. Está orientado más que nada a crear SPAs (_Single Page Applications_). O sea una aplicación web que una vez descargada al navegador no requiere refrescar la página.

Según sus creadores de Facebook, React es
> Una biblioteca de JavaScript para crear interfaces de usuario

En React definimos los distintos elementos de una aplicación como **componentes**, y sus competidores principales son Angular y Vue que utilizan un enfoque distinto pero similar.

Un componente en React está formado por elementos. Un elemento en React tiene esta pinta.

```js
const element = <h1>Hello, world!</h1>;
```

Esta sintaxis que usa React es una extensión de JavaScript llamada JSX. Los componentes de React son archivos de JavaScript que pueden utilizar expresiones de JSX para definir elementos de la interfaz de usuario.

En general la sintaxis de los elementos en React es la de las etiquetas de HTML, pero JSX no es HTML y hay varias excepciones que vamos a ir viendo. La más conocida, para dar un ejemplo, es la del atributo `class` en un elemento.

En HTML tenemos

```html
<h1 class="text-center">Hola</h1>
```

Y en JSX en cambio usamos `className` porque `class` es una palabra reservada en JavaScript.

```js
<h1 className="text-center">Hola</h1>
```

Pero en general lo que funciona en HTML funciona en JSX.

Un componente en React puede escribirse como una función de JS.

```js
const Saludo = (props) => {
  return (
    <h1>Hola, {props.name}</h1>
  );
};
```

Esta función tiene que devolver un elemento de React, en el ejemplo de arriba un `<h1>` y puede recibir un objeto como argumento llamado convencionalmente `props` por propiedades.

La forma de usar las propiedades es similar a los atributos de HTML. Siguiendo con el ejemplo de arriba, el componente `Saludo` lo podemos usar en un componente que represente a toda la aplicación de la siguiente manera.

```js
const App = (props) => {
  return (
    <div>
      <Saludo name="Juan" />
    </div>
  )
};
```

El valor de `props.name` en Saludo en el caso de arriba será `'Juan'`.

Existen muchos conceptos más en React que iremos viendo mientras hacemos el proyecto. Para los más curiosos el mejor lugar para empezar a entender como funciona React es la [documentación oficial](https://es.reactjs.org/docs/hello-world.html).

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
├── .gitignore
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

## Agregando dependencias

Para esta app vamos a usar Bootstrap y Font Awesome. Además vamos a usar un paquete de npm llamado Axios para realizar peticiones HTTP a la API en el _backend_.

Para instalar dependencias en React usamos npm pero desde el directorio `client`.

```console
$ npm i axios bootstrap
```

Para poder usar las clases de Bootstrap en JSX vamos a `client/src/index.js` y agregamos el siguiente import.

```js
import 'bootstrap/dist/css/bootstrap.css';
```

Para usar Font Awesome lo linkeamos directamente desde un CDN en `client/public/index.html`. En el `head` agregamos

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```

## Los componentes de la app

Para pensar en React tenemos que pensar en qué componentes vamos a dividir la aplicación. La app es un _frontend_ para la API que hicimos en `hello-crud`. O sea queremos poder ver, crear, editar y eliminar notas.

La siguiente imagen ilustra lo que se me ocurrió a mí.

![componentes](img/react-notas.png)

Un _header_ y un _footer_. Un formulario para agregar una nota y un contenedor en el centro para mostrar todas las notas. Todo eso dentro de un componente que representa toda la app.

Necesitamos archivos para cada componente, así que dentro de `client/src` hacemos

```console
$ touch Footer.js Header.js NoteForm.js NotesList.js Note.js
```

No hace falta crear `App.js` porque ya lo creó Create React App. Las notas las vamos a mostrar con dos componentes. `NotesList.js` para agrupar todas las notas y `Note.js` es el componente que representa cada nota individual. El componente `NoteForm.js` es el formulario que me permite agregar una nota nueva.

Vamos viendo el código componente por componente.

## Footer

```js
import React from 'react';

// footer component
const Footer = () => {
  return (
    <div className="text-center mb-3">
      <hr />
      <h4 className="text-muted">Hello React</h4>
      <a href="https://github.com/santiagotrini/hello-react">
        <i className="fa fa-github fa-3x text-dark"></i>
      </a>
    </div>
  );
};

export default Footer;
```

El _footer_ es el componente más simple. Solo tiene que importar React en la primera línea y es una función que devuelve JSX. No se olviden de exportar el componente con `export default` al final del archivo para poder usarlo después en `App.js`.

Noten el uso de `className` en vez de `class` para darle estilo con Bootstrap.

## Header

El próximo componente usa `props`. El _header_ recibe el título como propiedad.

```js
import React from 'react';

const Header = ({ title }) => {
  return (
    <nav className="justify-content-center navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/#">{title}</a>
    </nav>
  );
};

export default Header;
```

Para usar `props` en los elementos de JSX o en general cualquier expresión de JavaScript tenemos que encerrarla en `{}`. En el ejemplo tenemos `{title}` como el contenido del elemento `<a>`.

Para probar lo que tenemos hasta ahora y verlo en el navegador tenemos que modificar el componente App en `App.js`.

```js
// imports
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Header title='Notas'/>
      <Footer />
    </div>
  );
};

export default App;
```

Noten que tenemos que encerrar a Header y Footer en un `<div>` porque un componente de React solo puede devolver un único elemento. Pero ese elemento puede contener a su vez otros elementos.

También se puede ver como importamos los componentes Header y Footer con `import` al inicio del archivo.

## Componentes con estado

Hasta ahora los dos componentes que vimos no tienen estado. El Header tiene `props` pero las propiedades funcionan como valores que no cambian, se establecen al momento de crear el componente.

Si queremos un componente con valores que puedan cambiar necesitamos componentes con estado. El componente App por ejemplo mantiene una lista (_array_) con todas las notas de la app.

Para esto hacemos uso del _hook_ `useState` que nos da React.

```js
// imports
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const App = () => {

  // useState hook (las notas de la lista)
  const [notes, setNotes] = useState([]);

  // render JSX
  return (
    <div>
      <Header title='Notas'/>
      <div className="container mt-3">

      </div>
      <Footer />
    </div>
  );
};

// export
export default App;
```

La línea `const [notes, setNotes] = useState([]);` es donde usamos el _hook_ y obtenemos dos variables. En `notes` vamos a tener inicialmente un _array_ vacío. Y en `setNotes` tenemos una función que nos permite cambiar el valor de `notes`. Con la variable `notes` ya podemos empezar a escribir las funciones para realizar el CRUD en React.

## ABM de notas

Seguimos en `App.js`. Importamos `axios` para realizar las _requests_ a la API y agregamos tres funciones para crear, actualizar y borrar una nota del _array_ `notes`.

```js
// imports
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const App = () => {

  // useState hook (las notas de la lista)
  const [notes, setNotes] = useState([]);

  // funciones del CRUD
  // crear nota
  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
      });
  };

  // update note
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };

  // delete note
  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    });
  };

  // render JSX
  return (
    <div>
      <Header title='Notas'/>
      <div className="container mt-3">

      </div>
      <Footer />
    </div>
  );
};

// export
export default App;
```

El uso de Axios no requiere demasiada explicación. La sintaxis es `axios.METHOD(URL, DATA)` y eso devuelve una promesa, o sea podemos encadenar un `.then()` con una _callback_ dentro que se va a ejecutar cuando llegue la respuesta del servidor.

En `addNote()` recibimos como argumento un objeto que representa una nota y después de agregarla a la base de datos a través de la API usamos `setNotes()` para modificar el _array_ de notas. En esta función usamos el operador `...` conocido como _spread operator_ para crear un nuevo array con todos los elementos de notas más la nota recién creada al principio.

En `updateNote()` recibimos como argumentos el ID, el título y el texto de la nota a modificar. Después de recibir la respuesta del servidor usamos `notes.map()` para devolver un _array_ idéntico a `notes` excepto por la posición que modificamos.

En `deleteNote()` usamos el ID de la nota para hacer la petición a la API y modificamos el _array_ de notas con `notes.filter()` que devuelve un array con todos los elementos que cumplan con la condición `note._id !== id`.
