# JavaScript Moderno — Apuntes del curso

Este repositorio lo uso para practicar y recordar los conceptos que fui viendo en el curso de JavaScript moderno con Vite.

La idea de este README no es tener respuestas memorizadas, sino recordar **qué hace cada cosa, cómo pensarla y dónde suele aparecer un error**.

---

## 1. Variables

```js
let nombre = 'Michael';
const edad = 26;
```

- `let`: valor que puede cambiar.
- `const`: referencia que no se reasigna.
- Evitar `var` en código moderno.

---

## 2. Tipos básicos

```js
const nombre = 'Peter';     // string
const edad = 25;            // number
const activo = true;        // boolean
const valor = null;         // null
let dato;                    // undefined
```

---

## 3. Arrays

Un array guarda valores por posición.

```js
const autos = ['BMW', 'Mercedes Benz', 'Volvo'];
```

Los índices empiezan en `0`:

```js
autos[0]; // BMW
autos[1]; // Mercedes Benz
autos[2]; // Volvo
```

`length` indica cuántos elementos hay:

```js
autos.length; // 3
```

Por eso una condición típica es:

```js
let i = 0;

while (i < autos.length) {
    console.log(autos[i]);
    i++;
}
```

La última posición es `length - 1`.

---

## 4. Objetos

Los objetos guardan información con claves.

```js
const persona = {
    nombre: 'Peter',
    edad: 25,
};
```

Acceso directo:

```js
persona.nombre;
```

Acceso usando una variable:

```js
const propiedad = 'nombre';

persona[propiedad];
```

Esto fue útil para resolver ejercicios sin `if` ni `switch`, por ejemplo días de la semana:

```js
const dias = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
};

const hoy = new Date();
const dia = hoy.getDay();

console.log(dias[dia]);
```

---

## 5. Objetos y referencias

Los objetos se manejan por referencia.

```js
const cambiaNombre = (persona) => {
    persona.nombre = 'Tony';
    return persona;
};
```

Si paso un objeto directamente, la función modifica el mismo objeto original.

Con spread puedo crear una copia superficial:

```js
const cambiaNombre = ({ ...persona }) => {
    persona.nombre = 'Tony';
    return persona;
};
```

Idea importante:

```txt
sin copia  -> dos variables pueden apuntar al mismo objeto
con spread -> creo otro objeto
```

---

## 6. Funciones

Función tradicional:

```js
function saludar(nombre) {
    return `Hola ${nombre}`;
}
```

Arrow function:

```js
const saludar = (nombre) => {
    return `Hola ${nombre}`;
};
```

Versión corta:

```js
const saludar = nombre => `Hola ${nombre}`;
```

### Referenciar vs ejecutar

```js
spiderman.quienSoy;   // referencia al método
spiderman.quienSoy(); // ejecuta el método
```

---

## 7. Return

`return` devuelve un valor y termina la función.

```js
const sumar = (a, b) => {
    return a + b;
};
```

También sirve como salida temprana:

```js
if (!descripcion) return;
```

---

## 8. Operador ternario

Sirve para decisiones simples.

```js
const mensaje = edad >= 18 ? 'Mayor' : 'Menor';
```

También se puede anidar, aunque conviene evitarlo si empieza a ser difícil de leer.

Ejemplo que vimos con cartas:

```js
return isNaN(valor)
    ? (valor === 'A' ? 11 : 10)
    : valor * 1;
```

---

## 9. Destructuring

Arrays:

```js
const [vivo, soltero, nombre] = valores;
```

Objetos:

```js
const { nombre, edad } = persona;
```

La asignación en arrays depende de la posición.

---

## 10. Spread operator

Copia elementos de arrays u objetos.

```js
const copia = [...autos];
```

```js
const copiaPersona = { ...persona };
```

Es una copia superficial, no profunda.

---

## 11. Ciclos

### while

```js
while (condicion) {
    // se ejecuta mientras sea true
}
```

### do...while

```js
do {
    // se ejecuta al menos una vez
} while (condicion);
```

Esto fue importante en Blackjack: el bloque se ejecuta primero y la condición se evalúa después.

### for

```js
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

### for...of

```js
for (const tipo of tipos) {
    console.log(tipo);
}
```

### forEach

```js
todos.forEach(todo => {
    console.log(todo);
});
```

---

## 12. Métodos útiles de arrays

### push

Agrega al final.

```js
deck.push(carta);
```

### pop

Saca y devuelve el último elemento.

```js
const carta = deck.pop();
```

`pop()` **no es aleatorio**.

En Blackjack primero mezclábamos el mazo:

```js
deck = _.shuffle(deck);
```

### map

Transforma cada elemento y devuelve un array nuevo.

```js
state.todos = state.todos.map(todo => {
    if (todo.id === todoId) {
        todo.done = !todo.done;
    }

    return todo;
});
```

### filter

Devuelve solo los elementos que cumplen una condición.

```js
const pendientes = todos.filter(todo => !todo.done);
```

```js
const completados = todos.filter(todo => todo.done);
```

También sirve para borrar:

```js
state.todos = state.todos.filter(todo => todo.id !== todoId);
```

---

## 13. Clases

```js
class Persona {

    constructor(nombre, codigo) {
        this.nombre = nombre;
        this.codigo = codigo;
    }

    quienSoy() {
        console.log(`Soy ${this.nombre}`);
    }
}
```

Crear una instancia:

```js
const spiderman = new Persona('Peter Parker', 'Spider');
```

Ejecutar método:

```js
spiderman.quienSoy();
```

---

## 14. Clase Todo

En la Todo App usamos una clase para representar cada tarea.

```js
export class Todo {

    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}
```

Cada Todo tiene:

- `id` único.
- descripción.
- estado completado o pendiente.
- fecha de creación.

---

## 15. UUID

Instalación:

```bash
npm install uuid
```

Uso:

```js
import { v4 as uuid } from 'uuid';

const id = uuid();
```

Sirve para que cada Todo tenga un identificador único.

---

## 16. DOM

El DOM permite trabajar con el HTML desde JavaScript.

Buscar un elemento:

```js
const input = document.querySelector('#new-todo-input');
```

Por clase:

```js
document.querySelector('.todo-list');
```

Por id:

```js
document.querySelector('#pending-count');
```

Recordatorio:

```txt
. = class
# = id
sin . ni # = etiqueta HTML
```

Buscar varios:

```js
const filtros = document.querySelectorAll('.filtro');
```

---

## 17. Crear elementos HTML desde JS

```js
const liElement = document.createElement('li');
```

Cambiar contenido:

```js
liElement.innerHTML = html;
```

Agregar al DOM:

```js
element.append(liElement);
```

---

## 18. Eventos

```js
boton.addEventListener('click', (event) => {
    console.log(event);
});
```

### event.target

Es el elemento exacto sobre el que se hizo click.

```js
console.log(event.target);
```

Si hago click en:

```html
<button class="destroy"></button>
```

`event.target` es ese botón.

---

## 19. Delegación de eventos

En vez de poner un listener en cada Todo, ponemos uno en la lista completa.

```js
todoListUl.addEventListener('click', (event) => {
    // detectar qué se clickeó
});
```

Buscar el Todo al que pertenece el click:

```js
const element = event.target.closest('[data-id]');
```

Obtener su id:

```js
const id = element.getAttribute('data-id');
```

Esto permite:

- completar una tarea,
- borrar una tarea,
- detectar botones internos.

---

## 20. classList

Comprobar una clase:

```js
event.target.classList.contains('destroy');
```

Agregar:

```js
element.classList.add('completed');
```

Quitar:

```js
element.classList.remove('selected');
```

Alternar:

```js
element.classList.toggle('completed', todo.done);
```

---

## 21. Vite

Vite usa módulos ES.

El archivo principal se carga desde `index.html`:

```html
<script type="module" src="/src/main.js"></script>
```

Desde `main.js` podemos importar otros archivos:

```js
import './style.css';
import { App } from './todos/app.js';
```

---

## 22. Imports y exports

### Export nombrado

```js
export const Filters = {};
```

Se importa con llaves:

```js
import { Filters } from './archivo.js';
```

### Export default

```js
export default todoStore;
```

Se importa sin llaves:

```js
import todoStore from './archivo.js';
```

También se pueden combinar:

```js
import todoStore, { Filters } from '../store/todo.store.js';
```

---

## 23. Rutas relativas

```txt
./      misma carpeta
../     subir una carpeta
../../  subir dos carpetas
```

Siempre pensar:

> ¿Desde qué archivo estoy parado y a qué archivo quiero llegar?

Ejemplo:

```txt
src/todos/use-cases/render-pending.js
                -> ../../store/todo.store.js
```

---

## 24. Archivo index.js como barrel

Dentro de `use-cases/index.js` podemos centralizar exports:

```js
export { createTodoHtml } from './create-todo-html';
export { renderPending } from './render-pending';
export { renderTodos } from './render-todos';
```

Entonces desde `app.js`:

```js
import { renderTodos, renderPending } from './use-cases';
```

---

## 25. Estado de la aplicación

En la Todo App usamos un objeto `state`:

```js
const state = {
    todos: [],
    filter: Filters.All,
};
```

El estado representa los datos actuales de la aplicación.

Idea importante:

```txt
estado cambia
   ↓
displayTodos()
   ↓
se vuelve a renderizar el HTML
```

---

## 26. Filtros

```js
export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};
```

Luego usamos `filter()`:

```js
case Filters.Completed:
    return state.todos.filter(todo => todo.done);

case Filters.Pending:
    return state.todos.filter(todo => !todo.done);
```

---

## 27. Store

El store concentra la lógica de los datos.

Funciones que implementamos:

```txt
initStore()
loadStore()
getTodos()
addTodo()
toggleTodo()
deleteTodo()
deleteCompleted()
setFilter()
getCurrentFilter()
```

La UI no debería modificar directamente el estado.

En cambio:

```txt
UI -> store -> state -> render
```

---

## 28. localStorage

Guardar estado:

```js
localStorage.setItem('state', JSON.stringify(state));
```

Recuperarlo:

```js
const data = JSON.parse(localStorage.getItem('state'));
```

`localStorage` guarda strings, por eso usamos:

- `JSON.stringify()` para guardar.
- `JSON.parse()` para recuperar.

---

## 29. Renderizado de Todos

`renderTodos` recibe:

- selector del elemento.
- array de Todos.

```js
renderTodos(ElementIDs.TodoList, todos);
```

Después:

```js
todos.forEach(todo => {
    element.append(createTodoHtml(todo));
});
```

---

## 30. Render de pendientes

La función cuenta solo los pendientes:

```js
todoStore.getTodos(Filters.Pending).length;
```

y actualiza:

```html
<strong id="pending-count">0</strong>
```

Este ejercicio también reforzó algo importante: los nombres deben coincidir exactamente.

```txt
getTodo !== getTodos
```

---

## 31. Errores comunes que vi

### is not defined

```txt
ReferenceError: ElementIDs is not defined
```

Significa que la variable no existe con ese nombre.

Muchas veces es un typo:

```js
ElmentIDs
ElementIDs
```

---

### is not a function

```txt
todoStore.getTodos is not a function
```

Significa que el objeto existe, pero ese método no.

Ejemplo:

```txt
store exporta getTodo()
código intenta getTodos()
```

---

### Cannot read properties of null

```txt
Cannot read properties of null (reading 'append')
```

Normalmente significa:

```js
document.querySelector(...)
```

no encontró el elemento.

Comprobar:

```js
console.log(element);
```

---

### Failed to resolve import

Normalmente:

- ruta incorrecta,
- nombre de archivo incorrecto,
- falta `../`,
- archivo no existe.

---

### does not provide an export named

Ejemplo:

```txt
does not provide an export named 'renderPending'
```

Significa que estoy importando algo que ese módulo no exporta.

---

## 32. Debugging

Leer siempre el **primer error actual** de la consola.

La consola suele mostrar:

```txt
archivo.js:línea:columna
```

Ejemplo:

```txt
render-pending.js:16:35
```

Usar `console.log()` para comprobar valores:

```js
console.log(event.target);
console.log(element);
console.log(todoStore);
```

No cambiar cinco cosas a la vez. Corregir un error, recargar y mirar cuál aparece después.

---

## 33. Blackjack — conceptos practicados

Con el Blackjack practiqué:

- arrays,
- ciclos,
- `do...while`,
- funciones,
- operador ternario,
- DOM,
- eventos,
- botones habilitados/deshabilitados,
- creación dinámica de imágenes.

Ejemplo:

```js
btnPedir.disabled = true;
btnDetener.disabled = true;
```

Crear carta visual:

```js
const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${carta}.png`;
divCartasJugador.append(imgCarta);
```

---

## 34. Git y GitHub

Inicializar o trabajar dentro de un repo:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "mensaje"
```

Subir:

```bash
git push origin main
```

Traer cambios:

```bash
git pull origin main
```

Importante: Git solo controla archivos que están dentro de la carpeta que contiene `.git`.

---

## 35. Ideas que quiero recordar

- Los arrays empiezan en índice `0`.
- Los objetos se manejan por referencia.
- `event.target` me dice exactamente dónde hice click.
- `closest()` me permite subir hasta encontrar un padre.
- `querySelector()` devuelve `null` si no encuentra nada.
- `.` busca clases y `#` busca ids.
- `export default` se importa sin llaves.
- exports nombrados se importan con llaves.
- Las rutas dependen de **dónde estoy parado**.
- El store maneja los datos.
- La UI muestra esos datos.
- Si cambia el estado, tengo que volver a renderizar.
- Los nombres importados/exportados deben coincidir exactamente.
- Leer el error de consola antes de tocar código.

---

## 36. Estructura actual del proyecto

```txt
src/
├── store/
│   └── todo.store.js
│
├── todos/
│   ├── models/
│   │   └── todo.models.js
│   │
│   ├── use-cases/
│   │   ├── create-todo-html.js
│   │   ├── render-pending.js
│   │   ├── render-todos.js
│   │   └── index.js
│   │
│   ├── app.html
│   └── app.js
│
├── main.js
└── style.css
```

---

## Objetivo

No aprender código de memoria.

Quiero poder mirar un problema y pensar:

```txt
¿Qué dato tengo?
¿Qué quiero obtener?
¿Dónde está ese dato?
¿Qué función debería encargarse?
¿Qué devuelve?
¿Qué elemento del DOM tengo que actualizar?
```

Ese razonamiento vale más que memorizar una solución.
