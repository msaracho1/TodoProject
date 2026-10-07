import { Todo } from '../models/todo.models.js';
import { createTodoHtml } from './create-todo-html.js';

let element;


export const renderTodos = ( elementId, todos = [] ) => { 
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`Element with id ${elementId} not found`);

//TODO: renderizar todos los todos
    
    element.innerHTML = '';
    todos.forEach(todo => {
        element.append( createTodoHtml(todo));
    });
}