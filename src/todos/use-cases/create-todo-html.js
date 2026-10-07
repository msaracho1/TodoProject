import { Todo } from "../models/todo.models";

export const createTodoHtml = ( todo ) => {
    if ( !todo ) throw new Error('Todo is required');

    const html = `<div class="view">
                    <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : '' }>
                    <label>${ todo.description }</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${ todo.description }">`
    ;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    liElement.classList.toggle('completed', todo.done);
    if ( todo.done ) {
        liElement.classList.add('completed');
    }
    

    return liElement;
}