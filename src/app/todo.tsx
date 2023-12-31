'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleComplete, selectTodos } from './slice/taskSlice';



const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleKeyUp = (key: string) => {
    if (key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  return (
    <section className="bg-full xs:h-screen overflow-y-auto">
      <div className="flex justify-center px-6 py-8 mx-auto md:h-screen overflow-y-auto ">
        <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70 overflow-y-auto">
          <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
            <div className="w-full p-3">
              <h1 className="text-3xl text-black-600 font-black">To do List</h1>
              <p className="text-sm">{format(new Date(), 'MMMM d, yyyy')}</p>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-3.5 h-4 text-gray-500 dark:text-gray"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>{' '}
            </div>
            <input
              type="text"
              id="newTodo"
              className="block w-full pl-10 p-2  rounded-full bg-gray-100 text-black"
              placeholder="    Enter to Add new item"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e.key)}
            />
          </div>

          <ul className="block w-full pt-6">
            {todos.map((todo) => (
              <div key={todo.id}>
                <li className="w-full border-2 rounded-xl mt-2 hover:border-blue-300 hover:scale-110 transition-all">
                  <input
                    type="checkbox"
                    className="float-left block w-6 h-6 m-3 accent-gray-500"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="float-right w-7 h-7 m-2.5  text-gray-200  hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                  <label
                    className={`block w-full p-3 ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </label>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TodoList;