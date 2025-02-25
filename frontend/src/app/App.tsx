import {ChangeEvent, useState} from 'react'
import './App.css'

// TODO:
// 1. Add UUID to each to-do (optional because date can be used to order to-dos)
// 2. Add Date to each to-do when it was created

interface Todo {
    text: string;
    done: boolean;
}

type Filter = 'Active' | 'Done' | 'All';

function App() {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])
    const [filter, setFilter] = useState<Filter>('All')

    const addTodo = (text:string) => {
        text = text.trim()
        if (text){
            const newTodo:Todo = {
                text:text,
                done:false
            }
            setTodos((prevTodos:Todo[]):Todo[] => [...prevTodos, newTodo])
        }
        setNewTodo('')
    }

    const deleteTodo = (index:number) => {
        const newTodos:Todo[] = todos.filter((_todo:Todo, i:number):boolean => i !== index)
        setTodos(newTodos)
    }

    const filteredTodos = (filter: Filter): Todo[] => {
        switch(filter) {
            case 'Done': return todos.filter(todo => todo.done);
            case 'Active': return todos.filter(todo => !todo.done);
            default: return todos;
        }
    }

    const setTodoDone = (index:number) => {
        const newTodos:Todo[] = todos.map((todo:Todo, i:number):Todo => {
            if (i === index){
                return {
                    ...todo,
                    done: !todo.done
                }
            }
            return todo
        })
        setTodos(newTodos)
    }


  return (
    <>
        <h1>React To-Do App</h1>

        <div className="filter-todos">
            <p><strong>Filter: </strong></p>
            <button
                onClick={() => setFilter('Active')}
                style={{
                    borderColor: filter === 'Active' ? 'red' : '',
                }}>
                Active
            </button>
            <button
                onClick={() => setFilter('Done')}
                style={{
                    borderColor: filter === 'Done' ? 'red' : '',
                }}>
                Done
            </button>
            <button
                onClick={() => setFilter('All')}
                style={{
                    borderColor: filter === 'All' ? 'red' : '',
                }}>
                All
            </button>
        </div>

        <div className="add-todo">
            <input value={newTodo} onChange={(e:ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} name="newTodo" type="text" placeholder="Add a new task" />
            <button onClick={() => addTodo(newTodo)}>Add</button>
        </div>


            {filteredTodos(filter)?.map((todo:Todo, index:number) => (
                <div key={index} className="todo-list">
                    <p
                        onClick={() => setTodoDone(index)}
                        style={{
                            textDecoration: todo.done ? 'line-through' : 'none',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        {index + 1}. {todo.text}
                    </p>
                    <button onClick={() => deleteTodo(index)}>x</button>
                </div>
            ))
            }

    </>
  )
}

export default App
