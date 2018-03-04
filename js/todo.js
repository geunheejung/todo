const todoInit = (() => {
  let id = 0;
  let todoList = {};
  let showCreatePop = false;

  const init = () => {
    console.group('Todo Servie List');
    console.log('--- add ( "내용" )');
    console.log('--- remove ( id )');
    console.log('--- edit ( id, "내용" )');
    console.log('--- change ( id )');
    console.groupEnd();
    const todoListUl = document.querySelector('.todo-list');
    todoListUl.innerHTML = '';
  }

  const render = () => {
    let i = 0;
    let MAX = Object.keys(todoList).length;
    const targetEle = document.querySelector('.todo-list');
    init();
    for (i; i < MAX; i++) {
      if (todoList[i]) {
        targetEle.innerHTML += `<li>${todoList[i].id}${todoList[i].title}</li>`;
      }    
    }
  }

  const addList = (title) => {
    if (!title) return Error('Todo에 Title이 비어있습니다. 추가해주세요!');
    todoList = {
      ...todoList,
      [id]: {
        id,
        title,
        status: 'progress'
      }
    }
    id++;
    render();      
  }

  const toggleTodo = (id) => {
    todoList[id].status = 'success';
    render();
    return todoList;
  }

  const deleteTodo = (id) => {
    delete todoList[id];
    render();
    return todoList;
  };

  const editTodo = (id, title) => {
    const newTitle = title;
    todoList[id].title = newTitle;
    render();
    return todoList;
  };

  return {
    init: init,
    add: addList,
    change: toggleTodo,
    remove: deleteTodo,
    edit: editTodo,
    render: render,
  }
})();
todoInit.init();

