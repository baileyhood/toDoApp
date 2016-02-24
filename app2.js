
var toDoList = [];
var templates = {
    toDoTmpl: [
      "<div data-idx='<%= idx %>' class ='todo'>",
      "<ul>",
      "<li><input type='checkbox'class ='done'/><%= content %></li>",
      "<button class='delete'>delete</button>",
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


});
