const STATE = (function () {
  const p = { toString: () => { return 'progress'; } };
  const c = { toString: () => { return 'complete' } };

  return {
    PROGRESS: () => { return p; },
    COMPLETE: () => { return c; }
  }
})();
const warning = console.log;

const todo = (() => {
  let todoList = {};
  let target;

  const render = () => {
    target.render(Object.assign(todoList));
  };

  const addList = (() => {
    let id = 0;
    return (title) => {
      if (!title) return Error('Todo에 Title이 비어있습니다. 추가해주세요!');
      todoList = {
        ...todoList,
        [id]: {
          id,
          title,
          status: STATE.PROGRESS()
        },
      };
      id++;
      render();
    }
  })();

  const changeTodoStatus = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('상태를 변경할 Todo가 없습니다.');
    todoList[id].status = todoList[id].status === STATE.PROGRESS()
      ? STATE.COMPLETE()
      : STATE.PROGRESS();
    render();
  };

  const editTodoItem = (id, newTitle) => {    
    if (!todoList.hasOwnProperty(id) || !newTitle) return Error('변경할 Todo가 없습니다.');
    todoList[id].title = newTitle;
    render();
  };

  const deleteTodoItem = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('삭제할 Todo가 없습니다.');
    delete todoList[id];
    render();
  };

  return {
    setRenderer: (renderer) => {
      if (!(renderer instanceof Renderer));
      target = renderer;
      renderer.init(todo);
    },
    add: addList,
    toggle: changeTodoStatus,
    remove: deleteTodoItem,
    edit: editTodoItem,    
  }
})();





todoEvent.init();
todo.setRenderer(html);