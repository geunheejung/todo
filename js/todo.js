const todo = (() => {  
  let todoList = {};
  const STATE_P = 'progress';
  const STATE_C = 'success';
  const warning = (text) => console.log(text);
  
  const init = (mode) => {
    console.group('TODO 명령어 모음');
    warning('--- add ( "내용" )');
    warning('--- remove ( id )');
    warning('--- edit ( id, "내용" )');
    warning('--- toggle ( id )');
    console.groupEnd();         
  }
  const renderConsole = () => {
    console.group('----  현재 TODO 상태  ----');
    warning(todoList);
    console.groupEnd();
  }
 
  const addList = (() => {
    let id = 0;
    return (title) => {
      if (!title) return Error('Todo에 Title이 비어있습니다. 추가해주세요!');
      todoList = {
        ...todoList,
        [id]: {
          id,
          title,
          status: STATE_P
        },
      }
      id++;    
      renderConsole();      
    }
  })();
  
  const changeTodoProgress = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('상태를 변경할 Todo가 없습니다.');
    todoList[id].status = todoList[id].status === STATE_P
      ? STATE_C
      : STATE_P;
      renderConsole();
    return todoList;
  }

  const deleteTodoItem = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('삭제할 Todo가 없습니다.');
    delete todoList[id];
    renderConsole();
    return todoList;
  };

  const editTodoItem = (id, newTitle) => {    
    if (!todoList.hasOwnProperty(id) || !newTitle) return Error('변경할 Todo가 없습니다.');
    todoList[id].title = newTitle;
    renderConsole();
    return todoList;
  };

  return {
    init: init,
    add: addList,
    toggle: changeTodoProgress,
    remove: deleteTodoItem,
    edit: editTodoItem,    
  }
})();

const todoEvent = (() => {
  let showCreatePop = false;

  class EventBindEle {
    constructor(target, viewEle) {
      this.eventTarget = document.querySelector(target);
      this.viewEle = document.querySelector(viewEle);
    }
  }

  const toggleCreatePop = () => {
    const initEle = new EventBindEle('.create-todo', '.create-todo-pop');
    if (!(initEle instanceof EventBindEle)) return Error('createPopUp Target is Not EventBindEle instacne');
    initEle.eventTarget.addEventListener('click', () => {
      showCreatePop = true;
      initEle.viewEle.classList.add('on-pop');
    });
  }

  const toggleCloseBtn = () => {
    const initEle = new EventBindEle('.close-create-pop', '.create-todo-pop');
    if (!(initEle instanceof EventBindEle)) return Error('createPopUp Target is Not EventBindEle instacne');
    initEle.eventTarget.addEventListener('click', () => {
      showCreatePop = false;
      initEle.viewEle.classList.remove('on-pop');
    });
  }

  return {
    init: function() {
      toggleCreatePop();
      toggleCloseBtn();
    }
  }
})();

todoEvent.init();
todo.init();