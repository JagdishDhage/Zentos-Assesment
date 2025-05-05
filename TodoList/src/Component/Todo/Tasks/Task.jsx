import React, { useState, useEffect } from 'react';
import ViewTask from '../ViewTask/ViewTask';

function Task() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const handleOnChange = (e) => {
        setTask(e.target.value);
    };

    const addTask = () => {
        if (task.trim() === '') {
            setError('Enter the task');
            return;
        }
        const newTask = { text: task, completed: false };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTask('');
        setError('');
    };

    return (
        <>
            <div className="flex flex-col mt-10 items-center rounded-br-xl">
                <h1 className="m-5">Add New Task</h1>
                <div className="flex bg-white gap-3 w-full max-w-md p-5">
                    <input
                        type="text"
                        placeholder="Enter the task"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="task"
                        value={task}
                        onChange={handleOnChange}
                    />
                    <button
                        onClick={addTask}
                        className="p-3 bg-lime-500 rounded-2xl px-4 py-2"
                    >
                        Add Tasks +
                    </button>
                </div>
                <p className="text-red-500">{error}</p>
            </div>
            <ViewTask task={task} />
        </>
    );
}

export default Task;
