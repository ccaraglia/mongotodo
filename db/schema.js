const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

const postsSchema = new Schema({
  title: String,


//  user: Object
})

const tasksSchema = new Schema({
  name: String,
  smemo: String
})


module.exports = {
  User: createModel('User', usersSchema),
  Post: createModel('Post', postsSchema),
  Task: createModel('Task', tasksSchema)
}
