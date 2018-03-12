var Renderer = function() {};
Renderer.prototype.init = function(todo) {
  this.todo = todo;
  this._init();
};
Renderer.prototype.render = function(tasks) {
  this.tasks = tasks;
  this._render();
};
Renderer.prototype._init = function() {};
Renderer.prototype._render = function() {};

