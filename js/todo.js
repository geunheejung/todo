const todoInit = (() => {
  let id = 0;
  let todoList = {};

  const init = () => {
    console.log('------ 현재 상태 ------');
    console.log(todoList);
  }

  const addList = (title) => {
    id++;
    todoList = {
      ...todoList,
      [id]: {
        ...todoList[id],
        'id': id,
        'title': title,
        'status': 'progress'
      }
    }
    init();
    return todoList;
  }

  const toggleTodo = (id) => {
    todoList[id].status = 'success';
    init();
    return todoList;
  }

  return {
    addTodo: addList,
    toggle: toggleTodo,
  }
})();

todoInit.addTodo('밥먹자');
