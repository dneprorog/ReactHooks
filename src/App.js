import React from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
// import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => new Promise(resolve => {
    resolve(import('./Todo/AddTodo'));
}));

function App() {
  const [todos, setTodos] = React.useState([]);

    const [entries, setEntries] = React.useState([]);

    const addEntry = () => setEntries([entries.length, ...entries]);
    const deleteEntry = entry => setEntries(entries.filter(e => entry !== e));

  function toggleTodo(id) {
      setTodos(
          todos.map(todo => {
              if(todo.id === id) {
                  todo.completed = !todo.completed
              }
              return todo
          })
      );
  }

  function removeTodo(id) {
      setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
      setTodos(todos.concat(
          [{
              title,
              id: Date.now(),
              completed: false,
          }]
      ))
  }

  const title = 'simple todo list';

  return (
      <Context.Provider value={{removeTodo}}>
          <h1>{title.toUpperCase()}</h1>

          {entries.map(entry => (
              <div>
                  <div className="wrapper">
                      {/*<Modal />*/}
                      <React.Suspense fallback={<p>loading...</p>}>
                          <div className='wrapper-form'>
                              <AddTodo onCreate={addTodo} />
                              <button onClick={() => deleteEntry(entry)}>delete</button>
                          </div>
                          <TodoList todos={todos} onToggle={toggleTodo} />
                      </React.Suspense>
                  </div>
              </div>
          ))}
          <button className='btn-add' onClick={addEntry}>add TODO list</button>
      </Context.Provider>
  );
}

export default App;
