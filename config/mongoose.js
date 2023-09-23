const mongoose = require('mongoose');


// const url = 'mongodb+srv://pankajpurshotam:patel123@cluster0.l9qysyp.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(url ,{
//   useNewUrlParser: true,
// useUnifiedTopology: true,
// });
// const db=mongoose.connection;

main().catch(err => console.log(err));

//connecting mangoose
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/codify_development');

}

//connecting db to mangoose connection 
const db = mongoose.connection;




//checking successfully connected 
db.once('open' , function(){
    console.log('susscessfully connected to the database ');
})

module.exports = db;