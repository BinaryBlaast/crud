import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Office Task 1', description: 'This is the description for My First Task', status: 'Not Completed' },
    { id: 2, name: 'Office Task 2', description: 'This is the description for My Second Task', status: 'Completed' },
    { id: 3, name: 'Office Task 3', description: 'This is the description for My Third Task', status: 'Not Completed' },
  ]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '' });
  const [statusFilter, setStatusFilter] = useState('All');

  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { id: todos.length + 1, ...newTodo, status: 'Not Completed' }]);
      setNewTodo({ name: '', description: '' });
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTodo(todoToEdit);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo));
    setTodos(updatedTodos);
    setNewTodo({ name: '', description: '' });
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: todo.status === 'Completed' ? 'Not Completed' : 'Completed' } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = statusFilter === 'All' ? todos : todos.filter((todo) => todo.status === statusFilter);

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">My Todo</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          name="name"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />
        <input
          type="text"
          name="description"
          placeholder="Todo Description"
          value={newTodo.description}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />
        <button
          onClick={newTodo.id ? updateTodo : addTodo}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {newTodo.id ? 'Update' : 'Add Todo'}
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Todos</h2>
        <div>
          <span className="mr-2">Status Filter:</span>
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-2 py-1 rounded ${statusFilter === 'All' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('Completed')}
            className={`px-2 py-1 rounded ml-2 ${statusFilter === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('Not Completed')}
            className={`px-2 py-1 rounded ml-2 ${statusFilter === 'Not Completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Not Completed
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="bg-green-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{todo.name}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <span
                className={`px-2 py-1 rounded-full text-white ${
                  todo.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {todo.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => editTodo(todo.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => toggleTodoStatus(todo.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                {todo.status === 'Completed' ? 'Mark as Not Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;