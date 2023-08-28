import React, { useEffect, useState } from 'react'
import './taskList.css'
import TaskItem from './TaskItem';
import { toast } from 'react-hot-toast';
import axios from 'axios'

function TaskList() {
    const [taskList,setTaskList] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(true);
    const [newTask, setNewTask] = useState('');

    const addNewTask = async(e)=>{
        e.preventDefault();
        if(newTask.length <= 0){
            toast.error('Task is empty');
            return;
        }
        try{
            const{data} = await axios.post('/api/tasks', {
                title:newTask 
            });
            toast.success("new Task Added");
            setTaskList([{...data}, ...taskList]);
            setNewTask('');
            setIsAddingNew(false);
        }catch(err){
            console.log(err);
        }
    };

    const getTasks = async ()=>{
        try{
            const {data} = await axios.get('/api/tasks/myTasks');
            setTaskList(data)
        }catch(err){
            console.log(err);
        }
    }
    const deleteTask = async(id)=>{
        try{
            await axios.delete(`/api/tasks/${id}`);
            toast.success('Task Deleted');
            setTaskList(taskList.filter(task => task._id !== id))
        }catch(err){
            console.log(err);
        }
    }
    const toggleAddTask = ()=>{
        setIsAddingNew(!isAddingNew);
    }

    useEffect(()=>{
        getTasks();
    }, []);

  return (
    <div>
        <div className='topBar'>
            <button className='AddNewBtn' onClick={toggleAddTask}> Add new</button>
        </div>
        {isAddingNew && 
        <form className='AddTask-container' onSubmit={addNewTask}>
            <input type='text' value={newTask} onChange={(e)=> setNewTask(e.target.value)} placeholder='Task Name' />
            <button type='submit' onClick={addNewTask}>+</button>
        </form>}
        {taskList.length > 0 && 
        <table className='tasksTable'>
            <tbody>
                {taskList.map(task =>(
                    <TaskItem task={task} deleteTask={deleteTask} key={task._id}/>
                ))}   
            </tbody>
        </table>}
    </div>
  )
}

export default TaskList
