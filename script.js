function taskFactory (name) {
    return {
        title : name,
        description : "",
        deadline : "",
        priority : "",
        notes : "",
        checklist : "",
        getTitle : function() {return this.title;},
        getDescription : function() {return this.description;},
        getDeadline : function() {return this.deadline;},
        getPriority : function() {return this.priority;},
        getNotes : function() {return this.notes;},
        getChecklist : function() {return this.checklist;},
        setTitle : function(newName) {this.title = newName;},
        setDescription : function(desc) {this.description = desc;},
        setDeadline : function(date) {this.deadline = date;},
        setPriority : function(value) {this.priority = value;},
        setNotes : function(value) {this.notes = value;},
        setChecklist : function(value) {this.checklist = value;}
    }
}

function projectFactory (name, tag) {
    return {
        projectName: name,
        tags: [tag],
        tasks: [],
        getName: function () { return this.projectName; },
        getTags: function () { return this.tags; },
        getTasks: function () { return this.tasks; },
        getPriority: function () {
            let highestPriority = 0;
            for(let i = 0; i < this.tasks.length-1; i++) {
                if (this.tasks[i].getPriority() > highestPriority)
                {
                    highestPriority = this.tasks[i];
                }
            }
            return highestPriority;
        },
        addTask: function(task) { this.tasks.push(task); }
    }
}

const interface = (() => {
    let filters = ["inbox", "favorite", "today", "upcoming", "project"]
    let projects = [projectFactory("default-project", filters[0])]
    function clear (parent) {
        while(parent.firstChild) { parent.removeChild(parent.firstChild); }
    }
    function display(filter) {
        let inspectorDiv = document.getElementById("task_inspector");
        clear(inspectorDiv);
        console.log(inspectorDiv);
        for (let i = 0; i < projects.length; i++)
        {
            if ((filter == filters[0] && projects[i].getTags().includes(filters[0]))
            || (filter == filters[1] && projects[i].getTags().includes(filters[1]))
            || (filter == filters[2] && projects[i].getTags().includes(filters[2]))
            || (filter == filters[3] && projects[i].getTags().includes(filters[3]))
            || (filter == filters[4] && projects[i].getTags().includes(filters[4])))
            {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project")
                projectDiv.innerHTML = projects[i].getName();
                const projectTasks = projects[i].getTasks();
                for(let j = 0; j < projectTasks.length; j++)
                {
                    const taskDiv = document.createElement("div");
                    taskDiv.classList.add(projectTasks[j].getTitle())
                    taskDiv.classList.add("task")
                    taskDiv.innerHTML = projectTasks[j].getTitle();
                    projectDiv.append(taskDiv);
                    console.log("displaying project task:" + projectTasks[j].getTitle())
                }
                inspectorDiv.append(projectDiv);
                console.log("displaying project:" + projects[i].getName())
            }
        }
    }
    function displayInbox () {
        return () => {
            display(filters[0])
        }
    }
    function displayProjects () {
        return () => {
            display(filters[4])
        }
    }
    function addProject(name) {
        let newProject = projectFactory(name, filters[4]);
        console.log("created project:" + newProject.getName())
        projects.push(newProject);
        console.log("added project:" + projects[1].getName())
    }
    function addTask(projectName, taskName) {
        for (let i = 0; i < projects.length; i++)
        {
            if (projects[i].getName() == projectName)
            {
                let newTodo = taskFactory(taskName);
                projects[i].addTask(newTodo);
                console.log("added project task:" + projects[i].getName())
            }
        }
    }
    (document.getElementById("inboxButton")).addEventListener("click", displayInbox());
    document.getElementById("projectsButton").addEventListener("click", displayProjects());
    return {
        display,
        addProject,
        addTask
    };
})();

interface.addProject("test-project");
interface.addTask("test-project", "test-task");
interface.display("project");