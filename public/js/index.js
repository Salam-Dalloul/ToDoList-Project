var todoFunctions = {
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo){
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    var ourNewTodo = todoFunctions.cloneArrayOfObjects(todos)
    ourNewTodo.push({
      id: todoFunctions.generateId(),
      description: newTodo.description ,
      done: false
    });
    return ourNewTodo;
    },

  deleteTodo: function(todos, idToDelete) {
    var ourNewTodo = todoFunctions.cloneArrayOfObjects(todos);
    return ourNewTodo.filter(function(idToKeep){
      if(idToKeep.id !== idToDelete) return idToKeep;
    })
  },

  markTodo: function(todos, idToMark) {
    var ourNewTodo = todoFunctions.cloneArrayOfObjects(todos);
    return ourNewTodo.map(function(idToDone){
      if(idToDone.id === idToMark){
        idToDone.done=!idToDone.done;
        return idToDone;
      }
        else return idToDone;
    })
  },

  sortTodos: function(todos) {
    var ourNewTodo = todoFunctions.cloneArrayOfObjects(todos);
    var sorted = ourNewTodo.sort(function(x,y){
    return x.done - y.done;
  });
  return sorted;
}
}

// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
