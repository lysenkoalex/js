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
  this.renderTasks();
}

Todo.prototype.addTask = function(index, data) {
  var tasksList = this.getTasks();

  if (false === index) {
    tasksList.push(data);
    this.parentTasksList.append(this.buldTaskLine(data));
  } else {
    tasksList[index] = data;
  }

  this.seveTasks(tasksList);
}

Todo.prototype.removeTask = function(index) {
  var currentList = this.getTasks();
  currentList.splice(index, 1);
  jQuery(this.parentTasksList.find(".one-action-line")[index]).detach();
  this.seveTasks(currentList);
}

Todo.prototype.changeStatus = function(element) {
  var currentList = this.getTasks();
  if (element.find(".js-task-status").hasClass("complited")){
    currentList[element.index()].taskComplite = false;
    element.find(".js-task-status").removeClass("complited");
  } else {

    currentList[element.index()].taskComplite = true;
    element.find(".js-task-status").addClass("complited");
  }
  this.seveTasks(currentList);
}

Todo.prototype.renderTasks = function(data) {
  var _this = this,
      tasksListArray = _this.getTasks();

  $.each(tasksListArray, function(index, value){
    _this.buldTaskLine(value);
  });
}

Todo.prototype.buldTaskLine = function(data) {
  var _this = this,
  template = _this.oneLineT.clone();
  template.find(".one-action-text input").val(data.taskDesc);

  if(data.taskComplite){
    template.find(".js-task-status").addClass("complited");
  }

  template.find(".edit-action-button").on("click", function() {
    _this.editMode(jQuery(this).parents(".one-action-line"));
  })

  template.find(".remove-action-button").on("click", function() {
    _this.removeTask(jQuery(this).parents(".one-action-line").index());
  });

  template.find(".js-task-status").on("click", function() {
    _this.changeStatus(jQuery(this).parents(".one-action-line"));
  });

  _this.parentTasksList.append(template);
}

Todo.prototype.editMode = function(element){
  var elementIndex = element.index();
  if (element.hasClass("edit-mode")){
    element.removeClass("edit-mode");
    element.find(".one-action-text input").attr("readonly","");
    element.find(".edit-action-button").text("edit");
    this.addTask(elementIndex, {"taskDesc": element.find(".one-action-text input").val(), "taskComplite": this.getTasks()[elementIndex].taskComplite} );
  } else {
    element.addClass("edit-mode");
    element.find(".one-action-text input").removeAttr("readonly");
    element.find(".edit-action-button").text("save");
  }
}

Todo.prototype.getTasks = function() {
  return JSON.parse(localStorage.getItem('tasksList'))
}

Todo.prototype.seveTasks = function(obj) {
  localStorage.setItem('tasksList', JSON.stringify(obj));
}
