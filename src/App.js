import logo from './logo.svg';
import './App.css';
import TodoApp from './components/todo/TodoApp';
import { useState } from 'react';

function App() {
  return (

    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
