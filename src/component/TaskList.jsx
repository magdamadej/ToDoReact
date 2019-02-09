import React from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {

    const active = props.tasks.filter(task => task.active);
    const done = props.tasks.filter(task => !task.active);

    const activeTasks = active.map(task => <Task key={task.id} task={task} delete={props.delete} change={props.change} />)
    const doneTasks = done.map(task => <Task key={task.id} task={task} delete={props.delete} change={props.change} />)
    return (
        <div className="taskList">
            <div className="activeTasks">
                <h1>Zadania do zrobienia</h1>
                {activeTasks.length > 0 ? activeTasks : <p>Nie masz żadnych zadań do zrobienia :)</p>}
            </div>

            <hr />

            <div className="doneTasks">
                <h2>Zadania zrobione <span>({done.length})</span></h2>
                {doneTasks}
            </div>
        </div>
    );
}

export default TaskList;