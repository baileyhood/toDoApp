
var toDoList = [];
var templates = {
    toDoTmpl: [
      "<div class ='todo'>",
      "<ul>",
      "<li class= 'task-list' data-idx='<%= idx %>'><input type='checkbox'class ='done'/><%= content %></li>",
      "</ul>",
      "</div>"].join("")
  };


//GRABBING THE NEW ARRAY WITH NEW TO DO
function getToDos () {
  return toDoList;
}

//ADDING THE NEW TO-DOS TO THE ARRAY (DATA.JS)
function addToDo(newPost) {
  toDoList.push(newPost);
}

//DELETING THE TO DO
function deletePost(idx) {
  toDoList.splice(idx, 1);
}
//ADD ONE TO-DO TO THE DOM
function addToDoToDom(newToDo, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(newToDo));
}

//GETTING TO-DO FROM DOM
function getToDoFromDom() {
  var content = $('input[name="to-do-item"]').val();
  return {
    content: content,
    complete: false,
  };
}

//ADDS ALL THE TO DOS TO THE DOM
function addAllTodos(arr) {
  $('.task-list-area').html('');
  _.each(getToDos(), function (el, idx) {
    el.idx = idx;
    addToDoToDom(el, templates.toDoTmpl, $('.task-list-area'));
  });
}

//FILTER ALL TODOS BY COMPLETED
function getCompleted () {
  var completedToDos = _.filter(getToDos(), function (todo) {
    return todo.completed === true;
  });
  return completedTodos;
}

//FILTER ALL TODOS BY ACTIVE
function getActive () {
  var activeToDos = _.filter(getToDos(), function (todo) {
    return todo.completed === false;
  });
  return completedTodos;
}

function addCompletedTodos(arr, area) {
  // area.html("");
  _.each(arr, function(el,index) {
    el.idx = index;
    addToDoToDom(el,templates.toDoTmpl, $target);
  });
}

////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
//ADDING TASKS
  $("form").on('submit', function (event) {
    event.preventDefault();
    var newToDo = getToDoFromDom();
    console.log(newToDo);
    addToDo(newToDo);
    addAllTodos(getToDos());
    $('input[name="to-do-item"]').val('');
  });

//DELETING TASKS
  $('.task-list-area').on('click', '.delete', function (event) {
   var idx = $(this).closest('div').data('idx');
   deletePost(idx);
   addAllTodos(getToDos());
  //  numberChange(getTodo(), $('span'));
 });


//CONVERTING TRUE TO FALSE WHEN CLICKED: when checking off to do,
//this converts it to false.
 $('body').on('click', '.done', function (event) {
   var indexOfOurTodo = $(this).parent().data('idx');
   console.log(indexOfOurTodo);
   toDoList[indexOfOurTodo].complete = !toDoList[indexOfOurTodo].complete;
 });


//FILTER TO-DO ITEMS BY ALL/ACTIVE/COMPLETED
$('body').on('click', "#viewCompleted", function (event){
  var completedArr = [];
  completedArr = toDoList.filter(function(el,idx){
    toDoList[idx].idx= idx;
    return el.completed === true;
  });
  console.log(completedArr);
  addCompletedTodos (completedArr, '.completed-area');
  $('.task-list-area').addClass('.inactive');
  $('.completed-area').removeClass('.inactive');
});

});
