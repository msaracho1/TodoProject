import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store.js';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    clearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

export const App = ( elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo ( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
     }
     
     const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
     }

// cuando la funcion app es llamada, se ejecuta el codigo dentro de la funcion
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();   

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.clearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);
    // Listener del input
newDescriptionInput.addEventListener('keyup', (event) => {

    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
});


// Listener de la lista
todoListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
});    

todoListUl.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');
    if (!element || !isDestroyElement) return;
    
    todoStore.deleteTodo(element.getAttribute('data-id'));
    displayTodos();

})

clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
});





filtersLIs.forEach(element => {
    element.addEventListener('click', (element) => {
        filtersLIs.forEach(el => el.classList.remove('selected'));
        element.target.classList.add('selected');
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
        displayTodos();
    });
});

}
