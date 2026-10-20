# Todo App con Vite — apuntes de esta sección del curso

Este README resume **solamente la sección del curso en la que armé la Todo App con Vite**.

La idea es usarlo como recordatorio de cómo se organizó el proyecto, cómo se conectan el store, los renders y los eventos, y qué errores aparecieron mientras lo construía.

---

## Qué se trabajó en esta sección

En esta parte del curso practiqué:

- Vite y módulos de JavaScript.
- imports y exports.
- rutas relativas entre archivos.
- clases para modelar datos.
- UUID para IDs únicos.
- estado de la aplicación.
- store para centralizar la lógica.
- filtros de tareas.
- localStorage.
- renderizado dinámico del DOM.
- eventos.
- delegación de eventos.
- `event.target`.
- `closest()`.
- creación y eliminación de tareas.
- contador de pendientes.
- separación del código en casos de uso.

---

## Estructura del proyecto

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

La idea principal de esta estructura es que cada archivo tenga una responsabilidad clara.

---

## Flujo general de la aplicación

```txt
Usuario hace algo
      ↓
evento en app.js
      ↓
todoStore modifica el state
      ↓
se guarda en localStorage
      ↓
displayTodos()
      ↓
renderTodos()
      ↓
se actualiza el DOM
```

La UI no modifica directamente el estado.

La lógica queda centralizada en el store.

---

## main.js

Es el punto de entrada de la aplicación.

```js
import './style.css';
import { App } from './todos/app.js';
import todoStore from './store/todo.store.js';

todoStore.initStore();
App('#app');
```

Primero se inicializa el store y después se monta la aplicación.

---

## Modelo Todo

Cada tarea se representa con una clase.

```js
import { v4 as uuid } from 'uuid';

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

- un `id` único,
- una descripción,
- un estado `done`,
- una fecha de creación.

---

## UUID

Se instaló con:

```bash
npm install uuid
```

Y se usa así:

```js
import { v4 as uuid } from 'uuid';
```

Después:

```js
this.id = uuid();
```

Esto evita que todas las tareas tengan el mismo ID.

---

## El state

El estado guarda la información actual de la aplicación.

```js
const state = {
    todos: [],
    filter: Filters.All,
};
```

Tiene dos datos principales:

- `todos`: todas las tareas.
- `filter`: filtro seleccionado.

---

## Filtros

```js
export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};
```

Después el store decide qué tareas devolver.

```js
case Filters.All:
    return [...state.todos];

case Filters.Completed:
    return state.todos.filter(todo => todo.done);

case Filters.Pending:
    return state.todos.filter(todo => !todo.done);
```

---

## todo.store.js

El store concentra la lógica relacionada con los datos.

Funciones principales:

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

La idea es:

```txt
app.js pide una acción
      ↓
todoStore modifica state
      ↓
app.js vuelve a renderizar
```

---

## Agregar una tarea

```js
const addTodo = (description) => {

    if (!description)
        throw new Error('Description is required');

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
};
```

Primero se crea un nuevo `Todo`, después se agrega al array y finalmente se guarda el estado.

---

## Marcar una tarea como completada

```js
const toggleTodo = (todoId) => {

    state.todos = state.todos.map(todo => {

        if (todo.id === todoId) {
            todo.done = !todo.done;
        }

        return todo;
    });

    saveStateToLocalStorage();
};
```

`map()` recorre todas las tareas y cambia solamente la que coincide con el ID recibido.

---

## Eliminar una tarea

```js
const deleteTodo = (todoId) => {

    state.todos =
        state.todos.filter(todo => todo.id !== todoId);

    saveStateToLocalStorage();
};
```

`filter()` devuelve todas las tareas menos la que quiero eliminar.

---

## Eliminar todas las completadas

```js
const deleteCompleted = () => {

    state.todos =
        state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
};
```

Se conservan solamente las tareas pendientes.

---

## localStorage

El estado se guarda para que las tareas no desaparezcan al recargar.

Guardar:

```js
localStorage.setItem(
    'state',
    JSON.stringify(state)
);
```

Leer:

```js
JSON.parse(
    localStorage.getItem('state')
);
```

Importante:

- `JSON.stringify()` convierte el objeto a texto.
- `JSON.parse()` convierte el texto nuevamente a objeto.

---

## createTodoHtml

Esta función crea el HTML de una tarea.

```js
const liElement = document.createElement('li');

liElement.setAttribute('data-id', todo.id);

liElement.classList.toggle(
    'completed',
    todo.done
);
```

El `data-id` permite saber a qué tarea pertenece cada elemento visual.

Cuando `todo.done` es `true`, el `li` recibe la clase:

```txt
completed
```

y el CSS muestra la tarea tachada.

---

## renderTodos

Recibe:

- el selector de la lista,
- las tareas que se deben mostrar.

```js
export const renderTodos = (
    elementId,
    todos = []
) => {

    const element =
        document.querySelector(elementId);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(
            createTodoHtml(todo)
        );
    });
};
```

Primero limpia la lista y después vuelve a dibujar las tareas.

---

## renderPending

Sirve para mostrar cuántas tareas siguen pendientes.

```js
element.innerHTML =
    todoStore
        .getTodos(Filters.Pending)
        .length;
```

La idea importante es:

```txt
obtener pendientes
      ↓
contar con .length
      ↓
mostrar el número
```

---

## app.js

Este archivo conecta:

- HTML,
- store,
- eventos,
- renders.

Ejemplo de referencias del DOM:

```js
const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
};
```

Recordatorio:

```txt
. = class
# = id
```

---

## displayTodos()

Esta función reúne el render principal.

```js
const displayTodos = () => {

    const todos =
        todoStore.getTodos(
            todoStore.getCurrentFilter()
        );

    renderTodos(
        ElementIDs.TodoList,
        todos
    );

    updatePendingCount();
};
```

Cada vez que cambia algo en el estado se vuelve a llamar.

---

## Crear una tarea con Enter

```js
newDescriptionInput.addEventListener(
    'keyup',
    (event) => {

        if (event.keyCode !== 13) return;

        if (
            event.target.value.trim().length === 0
        ) return;

        todoStore.addTodo(
            event.target.value
        );

        displayTodos();

        event.target.value = '';
    }
);
```

Acá se practicó:

- `event`,
- `event.target`,
- validaciones,
- llamadas al store,
- volver a renderizar.

---

## event.target

```js
console.log(event.target);
```

Devuelve exactamente el elemento sobre el que se hizo click.

Por ejemplo, al tocar la X:

```html
<button class="destroy"></button>
```

`event.target` es ese botón.

---

## Delegación de eventos

En vez de poner un listener en cada tarea, se pone uno sobre toda la lista.

```js
todoListUl.addEventListener(
    'click',
    (event) => {
        // detectar qué se clickeó
    }
);
```

Esto funciona porque los eventos suben hacia los elementos padres.

---

## closest()

Para encontrar a qué Todo pertenece el elemento clickeado:

```js
const element =
    event.target.closest('[data-id]');
```

Después:

```js
const id =
    element.getAttribute('data-id');
```

Esto permite encontrar la tarea correcta aunque el click haya sido sobre:

- el checkbox,
- el label,
- el botón borrar.

---

## Botón eliminar

Primero se detecta si el click fue sobre el botón:

```js
const isDestroyElement =
    event.target.className === 'destroy';
```

Después se obtiene el Todo relacionado mediante `closest()` y su `data-id`.

Conceptualmente:

```txt
click
 ↓
¿fue en destroy?
 ↓
buscar data-id
 ↓
deleteTodo(id)
 ↓
displayTodos()
```

---

## Botón "Borrar completados"

```js
clearCompletedButton.addEventListener(
    'click',
    () => {

        todoStore.deleteCompleted();

        displayTodos();
    }
);
```

El botón no borra directamente elementos HTML.

Primero modifica el estado y después se vuelve a renderizar.

---

## Filtros de Todos / Pendientes / Completados

Cada filtro cambia el valor del store.

```js
switch (element.target.text) {

    case 'Todos':
        todoStore.setFilter(Filters.All);
        break;

    case 'Pendientes':
        todoStore.setFilter(Filters.Pending);
        break;

    case 'Completados':
        todoStore.setFilter(Filters.Completed);
        break;
}
```

Después:

```js
displayTodos();
```

---

## Imports y exports usados en esta sección

Export nombrado:

```js
export const Filters = {};
```

Import:

```js
import { Filters } from './archivo.js';
```

Export default:

```js
export default {
    getTodos,
    addTodo,
};
```

Import:

```js
import todoStore from './archivo.js';
```

Combinados:

```js
import todoStore, { Filters }
from '../store/todo.store.js';
```

---

## Rutas relativas

Regla que más tuve que mirar durante esta sección:

```txt
./      misma carpeta
../     subir una carpeta
../../  subir dos carpetas
```

Ejemplo desde:

```txt
src/todos/use-cases/render-pending.js
```

para llegar a:

```txt
src/store/todo.store.js
```

la ruta es:

```js
../../store/todo.store.js
```

Siempre pensar:

> ¿Desde qué archivo estoy parado y a qué archivo quiero llegar?

---

## index.js dentro de use-cases

Se usa para centralizar exports.

```js
export { createTodoHtml }
    from './create-todo-html';

export { renderPending }
    from './render-pending';

export { renderTodos }
    from './render-todos';
```

Entonces desde `app.js`:

```js
import {
    renderTodos,
    renderPending
} from './use-cases';
```

---

## Errores que aparecieron en esta sección

### `is not defined`

Ejemplo:

```txt
ElementIDs is not defined
```

Normalmente significa que:

- la variable no existe,
- está mal escrita,
- hay un typo.

Ejemplo real:

```txt
ElmentIDs
ElementIDs
```

---

### `is not a function`

Ejemplo:

```txt
todoStore.getTodos is not a function
```

En nuestro caso pasó porque un archivo tenía:

```txt
getTodo
```

y otro intentaba usar:

```txt
getTodos
```

Los nombres tienen que coincidir exactamente.

---

### `Cannot read properties of null`

Ejemplo:

```txt
Cannot read properties of null
(reading 'append')
```

Significa muchas veces que:

```js
document.querySelector(...)
```

no encontró el elemento.

Si no encuentra nada devuelve:

```js
null
```

---

### `Failed to resolve import`

Normalmente revisar:

- cantidad de `../`,
- nombre del archivo,
- extensión,
- ubicación real.

---

### `does not provide an export named`

Significa que intenté importar algo que ese archivo no está exportando.

Ejemplo:

```txt
renderPending
```

tenía que estar exportado desde:

```txt
use-cases/index.js
```

---

## Idea principal de toda esta sección

La parte más importante que quiero recordar es esta separación:

```txt
Todo
  ↓
representa un dato

Store
  ↓
maneja el estado

Use cases
  ↓
renderizan partes de la UI

app.js
  ↓
conecta eventos + store + renders

HTML
  ↓
estructura visual
```

Y el flujo general:

```txt
evento del usuario
      ↓
store modifica state
      ↓
se guarda
      ↓
se vuelve a renderizar
```

La idea no es manipular el HTML como fuente de verdad.

La fuente de verdad es el **state**.
