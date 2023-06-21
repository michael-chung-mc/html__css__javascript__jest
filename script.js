var todo = function(name) {
    var todo = {};
    todo.title = name,
    todo.description = "",
    todo.deadline = "",
    todo.priority = "",
    todo.notes = "",
    todo.checklist = "",
    todo.getTitle = function() {return todo.title;},
    todo.getDescription = function() {return todo.description;}
    todo.getDeadline = function() {return todo.deadline;}
    todo.getPriority = function() {return todo.priority;}
    todo.getNotes = function() {return todo.notes;}
    todo.getChecklist = function() {return todo.checklist;}
    todo.setTitle = function(newName) {todo.title = newName;},
    todo.setDescription = function(desc) {todo.description = desc;}
    todo.setDeadline = function(date) {todo.deadline = date;}
    todo.setPriority = function(value) {todo.priority = value;}
    todo.setNotes = function(value) {todo.notes = value;}
    todo.setChecklist = function(value) {todo.checklist = value;}
    return todo;
}

var project = function (name) {
    var project = {};
    project.name = name;
    project.tasks = todo();
    project.setTodo = function(todo) {
        tasks += todo;
    };
    project.getName = function () { return name; };
    return project
}

const defaultProjectDiv = document.createElement("div");
defaultProject = project("default");
defaultProjectDiv.innerHTML = defaultProject.getName();
document.body.appendChild(defaultProjectDiv);