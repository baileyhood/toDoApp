
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

//COUNTER
function counter ()
{$('h2').text(toDoList.length);}

function counterTakeOut ()
{$('h2').text(toDoList.length);}

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
    counter();
  });

//DELETING TASKS
  $('.task-list-area').on('click', '.delete', function (event) {
   var idx = $(this).closest('div').data('idx');
   deletePost(idx);
   addAllTodos(getToDos());
  //  numberChange(getTodo(), $('span'));
 });

//EDITING TASKS
$('.task-list-area').on('dblclick', '.task-list', function () {
   $('.task-list').attr('contenteditable','true');
});


//CONVERTING TRUE TO FALSE WHEN CLICKED: when checking off to do,
//this converts it to false.
 $('body').on('click', '.done', function (event) {
   var indexOfOurTodo = $(this).parent().data('idx');
   console.log(indexOfOurTodo);
   toDoList[indexOfOurTodo].complete = !toDoList[indexOfOurTodo].complete;
 });

 //CLEAR COMPLETED

 $(".clear-completed").on('click', function(){
   console.log ($(this));
   event.preventDefault();
   var completedArr = _.where(toDoList, {complete:true});
   completedArr.forEach(function(el) {
     deletePost(toDoList.indexOf(el));
   });
   addAllTodos(getToDos());
   counterTakeOut ();
   });

 });

//FILTER TO-DO ITEMS BY ALL/ACTIVE/COMPLETED
$('#viewAll').on('click', function (event){
  event.preventDefault();
  addAllTodos(getToDos());
});


$('#viewActive').on('click', function (event){
  event.preventDefault();
  var completedArr = _.where(toDoList, {complete:false});
  console.log (completedArr);
  function addAllCompletedDos(arr) {
    $('.task-list-area').html('');
    _.each(completedArr, function (el, idx){
      el.idx = idx;
      addToDoToDom(el, templates.toDoTmpl, $ ('.task-list-area'));
    });
  }
  addAllCompletedDos(completedArr);
});

$('#viewCompleted').on('click', function (event){
  event.preventDefault();
  var completedArr = _.where(toDoList, {complete:true});
  console.log (completedArr);
  function addAllCompletedDos(arr) {
    $('.task-list-area').html('');
    _.each(completedArr, function (el, idx){
      el.idx = idx;
      addToDoToDom(el, templates.toDoTmpl, $ ('.task-list-area'));
    });
  }
  addAllCompletedDos(completedArr);

});///end of doc ready
