let Router = require('express').Router;
const apiRouter = Router()

let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post
let Task = require('../db/schema.js').Task


// USERS
// ================
apiRouter.get('/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})

//// TASKS
// ================
//
apiRouter.get('/tasks', function(req, res){
  Task.find(req.query, function(err, results){
    res.json(results)
  })
})

//create one
apiRouter.post('/tasks', function(req, res){
    console.log('post req received')
    var newTask = new Task( req.body )
    newTask.save(function(err){
        if (err) console.log(err)
        else res.json(newTask)
    })
})

// POSTS
// ================
//read one
apiRouter.get('/tasks/:_id', function(req, res){
  Task.findOne(req.params, function(err, result){
    res.json(result)
  })
})


//update one
apiRouter.post('/tasks/:_id', function(req,res) {
    console.log('update req received')
    Task.findOne(req.params, function(err,record) {
        if (err) {
            console.log(err)
        }
        for (var prop in req.body) {
          record[prop] = req.body[prop]
        }
        record.save(function(err){
        if(err) res.json({message: 'error saving'})
        else res.json(record)
    })
  })
})

//delete one
apiRouter.delete('/tasks/', (req,res) => {
  Task.findByIdAndRemove(req.params,(err) => {
    res.status(204).json({msg: "record successfully deleted",
      _id: req.params._id})
  })
})

module.exports = apiRouter