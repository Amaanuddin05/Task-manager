
const pool = require('../db/database')

const getAllTasks = async (req,res)=>{
  try {
    const [tasks] = await pool.query(`
      select * from tasks;
      `)
      
      res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({msg:error});
  }
}

const createTask = async (req,res)=>{
  try {
    const {name,completed=false} = req.body;
    const task = await pool.query(`
      insert into tasks(name,completed)
      values (? , ?);
      `,[name,completed])
      res.status(201).json({task});
  } catch (error) {
    res.status(500).json({msg:error});
  }
}


const getTask = async (req,res)=>{
  try {
    const taskID = req.params.id;
    const task = await pool.query(`
      select * from tasks
      where _id = ?;
      `,[taskID])
    if(!task){
      return res.status(404).json({msg:`No task with id : ${taskID}`})
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({msg:error});
  }
}

const updateTask = async (req,res)=>{
  try {
    const taskID = req.params.id;
    const {name,completed} = req.body;
    const task = await pool.query(`
      update tasks 
      set name = ? , completed = ?
      where _id = ?;
      `,[name,completed,taskID])
    if(!task)
      {
        res.status(404).json({msg:`No task with id: ${taskID}`})
      }
    res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
      }
}

const deleteTask = async (req,res)=>{
  try {
    const taskID = req.params.id;
    const task = await pool.query(`
      delete from tasks
      where _id = ?;
      `,[taskID]);
    if(!task){
      return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({msg:`Successfully deleted task with id ${taskID}`,task})
  }
  
  catch (error) {
    res.status(500).json({msg:error});
  }
}


module.exports ={ 
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
}