import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    // check
    if (!newTaskTitle) return;

    const atividade = {
      id: 1+Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    console.log(atividade)
    setTasks(tasks => [...tasks, atividade]);
    setNewTaskTitle('');

    console.log(tasks);
    
  }

 
  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const reloadTasks = tasks.map( task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task );

    setTasks(reloadTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filtraAtividades = tasks.filter( task => task.id !==  id)

    setTasks(filtraAtividades);
  }

  return (
    
    <section className="task-list container">
      <header>

       <div className="input-group">
         <h2>Missões</h2>

         <input 
            type="text" 
            placeholder="Adicionar nova missão" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}