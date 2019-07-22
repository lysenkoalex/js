function Todo() {
  var _this = this;
  this.oneLineT = jQuery("#templates .one-action-line");
  this.parentTasksList = jQuery("#todo-wrap .js-actions-list");
  if(null == localStorage.getItem('tasksList')) {
    localStorage.setItem('tasksList', JSON.stringify([]));
  }

  jQuery(".js-new-action-form .js-new-action-button").on("click", function(){
    var textInput = jQuery(".js-new-action-form .js-new-action-input");
    _this.addTask(false, {"taskDesc": textInput.val(), "taskComplite": false});
    textInput.val("");
  });

  console.log(this.oneLineT);
}

Todo.prototype.addTask = function(index, data) {
  var tasksList = this.getTasks();

  if (false == index) {
    tasksList.push(data);
    this.parentTasksList.append(this.buldTaskLine(data));
  } else {
    tasksList[index] = data;
  }

  this.seveTasks(tasksList);
}

Todo.prototype.buldTaskLine = function(data) {

}

Todo.prototype.getTasks = function() {
  return JSON.parse(localStorage.getItem('tasksList'))
}

Todo.prototype.seveTasks = function(obj) {
  localStorage.setItem('tasksList', JSON.stringify(obj));
}
