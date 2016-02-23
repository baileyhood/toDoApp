$(document).ready(function(){

//CRUD
function getToDos () {
  return toDoData;
}

function addToDos (newToDo) {
  toDoData.push(newToDo);
}

function deleteToDo(idx) {
  toDoData.splice(idx,1);
}

function editToDo (idx) {
  return toDoData(idx).toDoItems(idx);
}



//ADDING/EDITS ON

function getToDoFromDom () {
  var content = $('input[name="to-do-item"]').val();
  return {
    content: content,
  }
}

function addToDoToDom (toDoData, templateStr, $target) {
  var tmpl = _.template(templateStr);
  $target.append(tmpl(toDoData));
}

function addAllToDosToDom (ar) {
  $('.main-section').html ('');
  _.each(getToDos (), function (el, idx){
    el.idx = idx;
    addToDoToDom(el, templates.toDo, $('.main-content'));
  })
}

$('form').on('submit', function (event){ //click event
  event.preventDefault();
  var newToDo = getToDoFromDom (); //getting input
  console.log(newToDo); // logging input
  addToDos(newToDo); // adding to array
  addAllToDosToDom(getToDos()); //adding back all the To Dos
  $('input').val(''); //clearing input
})

});
