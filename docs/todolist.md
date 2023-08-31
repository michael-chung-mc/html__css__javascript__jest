<<<<<<< HEAD
# practice__html_css__javascript
<a name="readme-top"></a>
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#goals">Goals</a>
            <ul>
                <li><a href="#about">About</li>
                <li><a href="#preview">Preview</li>
            </ul>
        </li>
        <li><a href="#design">Design</li>
          <ul>
            <li><a href="#requirements">Tools</li>
            <li><a href="#tools">Tools</li>
            <li><a href="#roadmap">Roadmap</li>
          </ul>
        </li>
        <li><a href="#usage">Usage</a>
            <ul>
                <li><a href="#install">Install</li>
                <li><a href="#run">Run</li>
            </ul>
        </li>
        <li><a href="#acknowledgements">Acknowledgements</li>
    </ol>
</details>

## Goals
Basic HTML and CSS and Javascript
### About
### Preview
https://michael-chung-mc.github.io/practice__html__css__javascript/
## Design
### Requirements
### Tools
* HTML
* CSS
* Javascript
* Visual Studio Code
* Xubuntu
* VirtualBox
* Git
### Roadmap
[x] dom manipulation theodinproject exercises  
[x] drop down menu  
[x] api giphy key  
[x] api weather key  
[ ] resolve signup page form validation and form validation regex  
[ ] style main index.html  
<details>
</summary>signup page</summary>

  - [x] sidebar design
  - [x] form validation
</details>


 <details>
 </summary>form validation regex</summary>

  - [x] JavaScript checks validation as the user progresses through the form. When a user leaves a form field, it should automatically validate that field.
  - [ ] Test out all possible cases.
  - [x] style validations with CSS by using the :valid and :invalid pseudo-classes
  </details>


<details>
</summary>image carousel</summary>

  - [x] next & previous to slide images
  - [x] arrow buttons to cycle images
  - [x] navigation dots to show image and also slide
  - [x] timeout to advance every 5 seconds
  </details>

<details>
</summary>library app</summary>

  - [x] display book
  - [x] add new book
  - [x] remove books
  - [x] read book
  - [x] form validation
  </details>

## Usage
### Install
### Run
## Acknowledgements
* [The Odin Project](https://www.theodinproject.com)
* [Google Materials & Symbols](fonts.google.com)
* [Unsplash](https://www.unsplash.com)
* [Open Meteo](https://www.open-meteo.com)
<p align="right">(<a href="#readme-top">back to top </a>)</p>
=======
# theodinproject--todo-list

Prompt:
1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.
2. Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.
3. Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
4. You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
5. The look of the User Interface is up to you, but it should be able to do the following:
    1. view all projects
    2. view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
    3. expand a single todo to see/edit its details
    4. delete a todo
6. For inspiration, check out the following great todo apps. (look at screenshots, watch their introduction videos etc.)
    1. Todoist
    2. Things
    3. any.do
7. Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    1. date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.
8. We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.
    1. localStorage (docs here) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:
        - Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
        - localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. You will learn more about this language in a later lesson, but it doesn’t hurt to get your feet wet now. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!

Class Diagram
```mermaid
---
title: TheOdinProject--ToDo--List
---
classDiagram
    note "TheOdinProject"
    class header~HTML~{

    }
    class sidebar~HTML~{

    }
    class inspector~HTML~{

    }
    class Interface~Javascript~{
        +createProject()
    }
    class Project~Javascript~{
        +name
        +addTodo()
    }
    class Todo~Javascript~{
        +title
        +description
        +dueDate
        +priority
    }
    Interface <|-- header
    Interface <|-- sidebar : view all projects
    Interface <|-- inspector : view all todos
    Interface --|> Project
    Interface --|> Todo : alter todo (complete/priority/delete)
    Project <|-- Todo : store
    Project --|> Todo : view todos

```
>>>>>>> a/main
