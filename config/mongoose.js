const mongoose = require('mongoose');


const url = 'mongodb+srv://pankajpurshotam:patel123@cluster0.l9qysyp.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url ,{
  useNewUrlParser: true,
useUnifiedTopology: true,
});
const db=mongoose.connection;




//checking successfully connected 
db.once('open' , function(){
    console.log('susscessfully connected to the database ');
})

module.exports = db;