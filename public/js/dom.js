// (function () {
//   const container = document.getElementById('todo-container');
//   const addTodoForm = document.getElementById('add-todo');
//   let state = [];
//
//   const createTodoNode = function (todo) {
//     const todoNode = document.createElement('li');
//     const SpanDescription = document.createElement('span');
//     SpanDescription.textContent = todo.description;
//
//     const markButtonNode = document.createElement('button');
//     markButtonNode.className = 'mark';
//     markButtonNode.innerText = 'Mark';
//
//     markButtonNode.addEventListener('click', (event) => {
//       let newState = todoFunctions.markTodo(state, todo.id);
//       newState = todoFunctions.sortTodos(newState);
//       update(newState);
//     });
//     if (todo.done) {
//       markButtonNode.innerText = 'Unmark';
//       SpanDescription.classList.toggle('todo-checked');
//       todoNode.classList.toggle('li-marked');
//     } else markButtonNode.innerText = 'Mark';
//
//     const deleteButtonNode = document.createElement('button');
//     deleteButtonNode.className = 'delete';
//     deleteButtonNode.innerText = 'Delete';
//     deleteButtonNode.addEventListener('click', (event) => {
//       let newState = todoFunctions.deleteTodo(state, todo.id);
//       newState = todoFunctions.sortTodos(newState);
//       update(newState);
//     });
//
//     todoNode.id = todo.id;
//     todoNode.appendChild(SpanDescription);
//     todoNode.appendChild(deleteButtonNode);
//     todoNode.appendChild(markButtonNode);
//     return todoNode;
//   };
//
//   if (addTodoForm) {
//     addTodoForm.addEventListener('submit', (event) => {
//       event.preventDefault();
//       const inputSelect = document.querySelector('input[name=description]');
//       const description = { description: inputSelect.value };
//       if (description.description.trim() !== '') {
//         let newState = todoFunctions.addTodo(state, description);
//         newState = todoFunctions.sortTodos(newState);
//         inputSelect.value = '';
//         update(newState);
//       } else alert('Soooooo, You gonna do nothing? interesting!');
//     });
//   }
//
//   var update = function (newState) {
//     state = newState;
//     renderState(state);
//   };
//
//   var renderState = function (state) {
//     const todoListNode = document.createElement('ul');
//
//     state.forEach((todo) => {
//       todoListNode.appendChild(createTodoNode(todo));
//     });
//
//     container.replaceChild(todoListNode, container.firstChild);
//   };
//
//   if (container) renderState(state);
// }());
