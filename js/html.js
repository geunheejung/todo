const Html = function() {
  let progressLi;
  let completeLi;
  let host;
};
Html.prototype = new Renderer();

Html.prototype._init = function() {
  this.progressLi = document.querySelector('.todo-list-wrap .progress li');
  this.completeLi = document.querySelector('.todo-list-wrap .complete li');

  this.progressLi.parentNode.removeChild(this.progressLi);
  this.completeLi.parentNode.removeChild(this.completeLi);
  // '할 일' 입력창 찾기
  // 추가버튼에 이벤트 주기
  const addTodoBtn = document.querySelector('.create-todo-form .add');
  const removeTodoBtn = document.querySelector('.create-todo-form .remove');
  const toggleTodoBtn = document.querySelector('.create-todo-form .toggle');
  let inputEle = document.querySelector('#create-todo-input');
  addTodoBtn.addEventListener('click', function() {
    todo.add(inputEle.value);
    inputEle.value = null;
  });
  removeTodoBtn.addEventListener('click', function() {
    todo.remove(inputEle.value);
    inputEle.value = null;
  });
  toggleTodoBtn.addEventListener('click', function() {
    todo.toggle(inputEle.value);
    inputEle.value = null;
  });
};

Html.prototype._render = function() {
  if (!this.progressLi || !this.completeLi) return Error('Html을 렌더할 요소가 없습니다.');
  const progress = document.querySelector('.todo-list-wrap .progress');
  const complete = document.querySelector('.todo-list-wrap .complete');
  const MAX = Object.keys(this.tasks).length;

  progress.innerHTML = '';
  complete.innerHTML = '';

  let todo;
  let child;
  for (let i = 0; i < MAX; i++) {
    todo = this.tasks[i];
    if (todo.status === STATE.PROGRESS()) {
      child = this.progressLi.cloneNode(true);
      child.querySelector('p').innerHTML = todo.title;
      progress.appendChild(child);
    } else if (todo.status === STATE.COMPLETE()) {
      child = this.completeLi.cloneNode(true);
      child.querySelector('p').innerHTML = todo.title;
      complete.appendChild(child);
    }
  }

  console.log('input 박스들의 기능을 채운다.');
};
const html = new Html();