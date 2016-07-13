import React from 'react'
import {TaskModel} from './app'
import Backbone from 'backbone'




const TasksView = React.createClass({
    getInitialState: function(){
        return{
            tasksColl: this.props.tasksColl
        }
    },
    componentWillMount: function(){
        console.log('bout to mount')
        // call in the collection
        var self = this

        this.props.tasksColl.fetch().then(self._resetList)

        this.props.tasksColl.on('update sync', self._resetList)

        Backbone.Events.on( 'resetList update sync', function(payload){
            self._resetList(payload)


        })

    },

    _resetList: function(d){
            console.log('fetched data init', d)
            this.setState({
                tasksColl: this.state.tasksColl
            })
    },

    _addTask: function(taskName) {
        var newMod = new TaskModel({
            name: taskName
        })

        newMod.save().then(function(serverResponse){
            console.log('server response:')
            console.log(newMod)
            console.log(serverResponse)
            Backbone.Events.trigger('resetList', serverResponse)
        })

        this.props.tasksColl.add(newMod)
    },

    render: function() {
        console.log(this.props)
        return (
            <div id="tasksViewContainer">
                <Header />
                <TaskAdder _addTaskFromTasksView={this._addTask} />
                <TaskList tasksColl={this.state.tasksColl} />
            </div>
            )
    }
})

const TaskAdder = React.createClass({

    _handleTaskAdd: function(e) {
        if (e.keyCode === 13) {
            this.props._addTaskFromTasksView(e.target.value)
            e.target.value = ''
        }
    },

    render: function() {
        return (
            <input onKeyDown={this._handleTaskAdd} />
            )
    }
})

const TaskList = React.createClass({

    _getTaskComponents: function(tasksColl) {
        return tasksColl.map((mod) => <Task taskModel={mod} />)
    },

    render: function() {
        return (
            <ul id="taskList">
                {this._getTaskComponents(this.props.tasksColl)}
            </ul>
            )
    }
})

const Task = React.createClass({

    _changeSMEMO: function(e) {
        console.log('saving')
        this.props.taskModel.set({
            smemo: e.target.value
        })
        console.log(this.props.taskModel)
        this.props.taskModel.save(null, {
            url: '/api/tasks/' + this.props.taskModel.get('_id')
        })
    },

    _killTask: function(e) {
        e.preventDefault()
        var taskToRemove = this.props.taskModel
        console.log(taskToRemove)

      {/*  this.props.taskModel.destroy()  */}

var url = this.props.taskModel.url + '/' + this.props.taskModel.get('_id')

        this.props.taskModel.destroy(
        { url: url

        }).then(function(response){console.log(response)})

        console.log(url)
    },

    render: function() {

        return (
            <div className="task">
           {/*}     <p>{this.props.taskModel.get('smemo')}</p>  */}
                <span className="name">{this.props.taskModel.get('name')}</span>
   {/*}                <select onChange={this._changeSMEMO}>
                    <option>memo or smemo?</option>
                    <option value="memo" >memo</option>
                    <option value="smemo" >smemo</option>
                </select>
      */}

                <button onClick={this._killTask}>X</button>
            </div>
            )
    }
})

const Header = React.createClass({
    render: () => {
        return (
            <div id="headingContainer">
                <h1><img id="logo" src="http://www.arezzowave.com/wp-content/uploads/2014/03/Smemoranda_logo_hi-res_black.jpg" /></h1>
                <p>Things to forget ...</p>
            </div>
            )
    }
})

export default TasksView