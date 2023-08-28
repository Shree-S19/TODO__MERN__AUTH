import React, { useState } from 'react';
import './taskItem.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function TaskItem({task, deleteTask}) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    // const [isLoading, setIsLoading] = useState(false);
    const handleCheck = async()=>{
        try{
            // setIsLoading(true);
            await axios.put(`/api/tasks/${task._id}`,{
                completed : !isCompleted,
            });
            setIsCompleted(!isCompleted);
            if(!isCompleted)toast.success("Task Completed");
        }catch(err){
            console.log(err);
        }
        // finally{
        //     setIsLoading(false);
        // }
    }
  return (
    <tr className='taskItems'>
        <td className='taskName'>
            <div className='checkBox'>
                <button onClick={handleCheck}>-</button>
            </div>
            <p>{task.title}</p>
        </td>
        <td>{isCompleted ? 'Completed' :'Incomplete'}</td>
        <td> 
            <button className='deleteBtn' onClick={()=> deleteTask(task._id)}>
                Delete
            </button>
        </td>
    </tr>
  )
}

export default TaskItem
