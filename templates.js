var templates = {};

templates.toDo = [
  "<div class = 'toDoItem' data-idx='<%= idx %>'>",
  "<span class='fa fa-circle checkbox'></span>",
  "<p class = 'toDoContent'> <%= content %> <p>"
].join("");
