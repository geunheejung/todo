const todoInit = (() => {
  let id = 0;
  let todoList = {};
  const STATE_P = 'progress';
  const STATE_C = 'success';

  const init = () => {
    console.group('TODO 명령어 모음');
    console.log('--- add ( "내용" )');
    console.log('--- remove ( id )');
    console.log('--- edit ( id, "내용" )');
    console.log('--- change ( id )');
    console.groupEnd();
    console.group('현재 TODO 상태');
    console.log('todoList --- ', todoList);
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
      if (todoList.hasOwnProperty(id)) {
        targetEle.innerHTML += todoList[i] === 'success'
        ?`<li>${todoList[i].id}  ---  ${todoList[i].title}<span>O</span></li>`
        :`<li>${todoList[i].id}  ---  ${todoList[i].title}</li>`;
      }
    }
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
      render();      
    }
  })();
  
  const toggleTodo = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('상태를 변경할 Todo가 없습니다.');
    todoList[id].status = todoList[id].status === STATE_P 
      ? STATE_C
      : STATE_P;
    render();
    return todoList;
  }

  const deleteTodo = (id) => {
    if (!todoList.hasOwnProperty(id)) return Error('삭제할 Todo가 없습니다.');
    delete todoList[id];
    render();
    return todoList;
  };

  const editTodo = (id, title) => {
    if (!todoList.hasOwnProperty(id)) return Error('변경할 Todo가 없습니다.');
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

const todoEventInit = (() => {
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
todoEventInit.init();
todoInit.init();