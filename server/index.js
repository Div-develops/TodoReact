const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


main()
.then((res)=> console.log("database connected"))
.catch((err) => console.log(err));


async function main() {
  await mongoose.connect("mongodb+srv://divdev:mongodb@cluster0.v3cv1aw.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

}
const taskSchema = new mongoose.Schema({
  taskName: String,
  id:Number,
  completed:Boolean
});

const Task = mongoose.model('Task', taskSchema);


app.get("/", (req, res) => {
  res.json("hi");
});

app.post("/addTask", (req, res) => {
  let body=req.body
  console.log("helooo")

  const newTask = new Task({ 
    taskName: req.body.taskName,
    id:req.body.id,
    completed:req.body.completed
  });

  newTask.save()
  .then(()=>console.log("task saved succesfully in db"))
  .catch((err)=>console.log(err))

  console.log(req.body);
  //  const list =JSON.parse(req.body)
  // task.push(req.body);
  // console.log(task);
  res.status(200).send("succesfully saved");
});

app.get("/showTask", (req, res) => {
  Task.find({},(error,task)=>{
    if(error){
      res.send(error);

    }
    else{
      res.send(task)
    }
  })
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
