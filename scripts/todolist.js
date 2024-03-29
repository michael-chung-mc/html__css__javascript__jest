function taskFactory (name, tag) {
    return {
        title : name,
        description : "",
        deadline : "",
        priority: 0,
        tags: [tag],
        notes : "",
        checklist : "",
        tasks: [],
        getName: function() {return this.title;},
        getDescription : function() {return this.description;},
        getDeadline : function() {return this.deadline;},
        getTags: function () { return this.tags; },
        getPriority: function () { return this.priority; },
        getTasks: function () { return this.tasks; },
        getNotes : function() {return this.notes;},
        getChecklist : function() {return this.checklist;},
        setTitle : function(newName) {this.title = newName;},
        setDescription : function(desc) {this.description = desc;},
        setDeadline : function(date) {this.deadline = date;},
        setPriority : function(value) {this.priority = value;},
        setNotes : function(value) {this.notes = value;},
        setChecklist : function(value) {this.checklist = value;},
        addTask: function(task) { this.tasks.push(task); },
        deleteTask: function(taskId) {this.tasks.splice(taskId,1);}
    }
}

const interface = (() => {
    let filters = ["inbox", "today", "upcoming", "filters", "favorite", "project"]
    let currentFilter = filters[5];
    let projects = []
    function clear (parent) {
        while(parent.firstChild) { parent.removeChild(parent.firstChild); }
    }
    function display(filter) {
        let inspectorDiv = document.getElementById("task_inspector");
        let inboxCategory = document.getElementById("inbox");
        let todayCategory = document.getElementById("today");
        let upcomingCategory = document.getElementById("upcoming");
        let filtersCategory = document.getElementById("filters");
        let favoritesCategory = document.getElementById("favorites");
        let projectsCategory = document.getElementById("projects_list");
        clear(inspectorDiv);
        clear(projectsCategory);
        //console.log(inspectorDiv);
        for (let i = 0; i < projects.length; i++)
        {
            let display = false;
            if (filter == filters[0] && projects[i].getTags().includes(filters[0]))
            {
                display = true;
            }
            else if (filter == filters[1] && projects[i].getTags().includes(filters[1]))
            {
                display = true;
            }
            else if (filter == filters[2] && projects[i].getTags().includes(filters[2]))
            {
                display = true;
            }
            else if (filter == filters[4] && projects[i].getTags().includes(filters[4]))
            {
                display = true;
            }
            else if (projects[i].getTags().includes(filters[5]))
            {
                if (filter == filters[5]) {display = true;}
                const projectLabel = document.createElement("div");
                projectLabel.innerHTML = projects[i].getName();
                projectsCategory.append(projectLabel);
            }
            if (display)
            {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project")
                // name = text field to allow changing of name
                const projectName = document.createElement("input");
                projectName.value = projects[i].getName();
                projectName.addEventListener("input", (e) => (editProjectName(i, e.target.value)));
                projectDiv.append(projectName);
                // add task button
                const addTaskButton = document.createElement("button");
                addTaskButton.innerHTML = "Add Task";
                addTaskButton.addEventListener("click",addTask(i,"default-task"));
                projectDiv.append(addTaskButton);
                // delete project button
                const deleteProjectButton = document.createElement("button");
                deleteProjectButton.innerHTML = "Delete Project";
                deleteProjectButton.addEventListener("click",deleteProject(i));
                projectDiv.append(deleteProjectButton);
                // add tasks
                const projectTasks = projects[i].getTasks();
                for(let j = 0; j < projectTasks.length; j++)
                {
                    const tasksDiv = document.createElement("div");
                    tasksDiv.className = "taskView"
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    const taskDiv = document.createElement("div");
                    //taskDiv.classList.add(projectTasks[j].getName())
                    taskDiv.classList.add("task")
                    // task as text to allow edit
                    const taskName = document.createElement("input");
                    taskName.value = projectTasks[j].getName();
                    taskName.addEventListener("input", (e) => (editTaskName(i,j, e.target.value)));
                    taskDiv.append(taskName);
                    // delete task button
                    const deleteTaskButton = document.createElement("button");
                    deleteTaskButton.innerHTML = "Delete Task";
                    deleteTaskButton.addEventListener("click",deleteTask(i,j));
                    taskDiv.append(deleteTaskButton);
                    // display task
                    tasksDiv.append(checkbox);
                    tasksDiv.append(taskDiv)
                    projectDiv.append(tasksDiv);
                    //og("displaying project task:" + projectTasks[j].getName())
                }
                // display
                inspectorDiv.append(projectDiv);
                //console.log("displaying project:" + projects[i].getName())

            }
        }
    }
    function displayInbox () {
        return () => {
            currentFilter = filters[0];
            display(currentFilter)
        }
    }
    function displayToday () {
        return () => {
            currentFilter = filters[1];
            display(currentFilter)
        }
    }
    function displayUpcoming () {
        return () => {
            currentFilter = filters[2];
            display(currentFilter)
        }
    }
    function displayFilters () {
        return () => {
            currentFilter = filters[3];
            display(currentFilter)
        }
    }
    function displayFavorites () {
        return () => {
            currentFilter = filters[4];
            display(currentFilter)
        }
    }
    function displayProjects () {
        return () => {
            currentFilter = filters[5];
            display(currentFilter)
        }
    }
    function addProject(name) {
        return () => {
            let newProject = taskFactory(name, filters[5]);
            //console.log("created project:" + newProject.getName())
            projects.push(newProject);
            //console.log("added project:" + projects[projects.length-1].getName())
            display(currentFilter);
            setStorage();
        }
    }
    function addTask(projectId, taskName) {
        return () => {
            if (projectId >= 0 && projectId < projects.length && projects[projectId] != null)
            {
                let newTodo = taskFactory(taskName);
                projects[projectId].addTask(newTodo);
                //console.log("added project task:" + projects[projectId].getName())
            }
            display(currentFilter);
            setStorage();
        }
    }
    function deleteTask (projectId, taskId){
        return () => {
            if (projectId >= 0 && projectId < projects.length && projects[projectId] != null
                && taskId >= 0 && taskId < projects[projectId].getTasks().length && projects[projectId].getTasks()[taskId] != null)
            {
                projects[projectId].deleteTask(taskId);
            }
            display(currentFilter);
            setStorage();
        }
    }
    function deleteProject (projectId) {
        return () => {
            if (projectId >= 0 && projectId < projects.length && projects[projectId] != null)
            {
                projects.splice(projectId,1);
            }
            display(currentFilter);
            setStorage();
        }
    }
    function editProjectName(projectId, newName) {
        if (projectId >= 0 && projectId < projects.length && projects[projectId] != null)
        {
            projects[projectId].setTitle(newName);
        }
        //display(currentFilter);
        setStorage();
    }
    function editTaskName(projectId, taskId, newName) {
        if (projectId >= 0 && projectId < projects.length && projects[projectId] != null
            && taskId >= 0 && taskId < projects[projectId].getTasks().length && projects[projectId].getTasks()[taskId] != null)
        {
            projects[projectId].getTasks()[taskId].setTitle(newName);
        }
        //display(currentFilter);
        setStorage();
    }
    function setStorage () {
        window.localStorage.clear();
        // for (let i = 0; i < projects.length; i++)
        // {
        //     window.localStorage.setItem(filters[5], JSON.stringify(projects[i]));
        // }
        window.localStorage.setItem(filters[5], JSON.stringify(projects));
        console.log("set");
    }
    function synchStorage () {
        projects = [];
        let data = window.localStorage.getItem(filters[5])
        if (data)
        {
            console.log("synching")
            const jsonData = JSON.parse(data);
            console.log(jsonData)
            for (let i = 0; i < jsonData.length; i++)
            {
                let newProject = taskFactory(jsonData[i].title, filters[5]);
                for (let j = 0; j < jsonData[i].tasks.length; j++)
                {
                    let newTodo = taskFactory(jsonData[i].tasks[j].title);
                    newProject.addTask(newTodo);
                }
                console.log(newProject)
                projects.push(newProject);
                console.log(projects)
                display(currentFilter);
                console.log("synched")
            }
        }
        else
        {
            addProject("default-project")();
            addTask(0, "test-task")();
        }
    }
    document.getElementById("add_project_button").addEventListener("click",addProject("new project"));
    document.getElementById("inbox_button").addEventListener("click", displayInbox());
    document.getElementById("today_button").addEventListener("click", displayToday());
    document.getElementById("upcoming_button").addEventListener("click", displayUpcoming());
    document.getElementById("filters_button").addEventListener("click", displayFilters());
    document.getElementById("favorites_button").addEventListener("click", displayFavorites());
    document.getElementById("projects_button").addEventListener("click", displayProjects());
    //document.body.addEventListener("click",display(currentFilter));
    return {
        display,
        addProject,
        addTask,
        synchStorage
    };
})();
interface.synchStorage();
interface.display("project");