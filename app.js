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
  };
}

// function addToDoToDom (toDoData, templateStr, $target) {
//   var tmpl = _.template(templateStr);
//   $target.append(tmpl(toDoData));
// }
//
// function addAllToDosToDom (ar) {
//   $('.main-section').html('');
//   _.each(getToDos(), function(el){
//     addToDoToDom(el, templates.toDo, $('.main-section'))
//   })
// }

function addToDo () {
  var text = $(".to-do-input").val();
  $("#todolist").append("<li><input type='checkbox'class ='done'/>"+text+"</li>");
}

//ADDING NEW TASK AND PUTTING INTO ARRAY
$('form').on('submit', function (event){ //click event
  event.preventDefault();
  addToDo ();
  var newToDo = getToDoFromDom (); //getting input
  console.log(newToDo); // logging input
  addToDos(newToDo); // adding to array
  var random = getToDos();
  console.log (random);
  $('input').val(''); //clearing input
});

///trying to figure out strikethrough
// $('.done').on('click', finishItem () {
//   $(this).parent.css("text-decoration", "line-through");
// });

}); //end of document read
