import ReactDOM from 'react-dom'
import React from 'react'
import TasksView from './Component'
import Backbone from 'backbone'


export const TaskModel = Backbone.Model.extend({
    url: "api/tasks",
    defaults: {
        smemo: 'memo'
    }
})

const TaskCollection = Backbone.Collection.extend({
    model: TaskModel,
    url: "api/tasks"
})

const app = function() {



    ReactDOM.render(<TasksView tasksColl={new TaskCollection()} />,document.querySelector('.container'))
}

app()

