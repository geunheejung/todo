const Con = function() {};
Con.prototype = new Renderer();
Con.prototype._init = function() {
  console.clear();
  console.group('TODO 명령어 모음');
  warning('--- add ( "내용" )');
  warning('--- remove ( id )');
  warning('--- edit ( id, "내용" )');
  warning('--- toggle ( id )');
  console.groupEnd();
};
Con.prototype._render = function() {
  const MAX = Object.keys(this.tasks).length;

  const renderTodoList = (isComplete, i) => {
    if (isComplete) console.group('------ 현재 COMPLETE 상태------');
    else console.group('------ 현재 PROGRESS 상태------');
    warning('ID --> ', this.tasks[i].id);
    warning('TITLE --> ', this.tasks[i].title);
    warning('STATUS --> ', this.tasks[i].status.toString());
    console.groupEnd();
  };
  console.clear();
  for (let i = 0; i < MAX; i++) {
    renderTodoList(this.tasks[i].status === STATE.COMPLETE(), i);
  }
};

const con = new Con();