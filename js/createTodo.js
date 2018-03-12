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
  };

  const toggleCloseBtn = () => {
    const initEle = new EventBindEle('.close-create-pop', '.create-todo-pop');
    if (!(initEle instanceof EventBindEle)) return Error('createPopUp Target is Not EventBindEle instacne');
    initEle.eventTarget.addEventListener('click', () => {
      showCreatePop = false;
      initEle.viewEle.classList.remove('on-pop');
    });
  };

  return {
    init: function() {
      toggleCreatePop();
      toggleCloseBtn();
    }
  }
})();