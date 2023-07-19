import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
}

const initialState: TaskState = {
  todos: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newId = state.todos.length > 0 ? state.todos[state.todos.length - 1].id + 1 : 1;
      const newTodoItem: Todo = {
        id: newId,
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodoItem);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete } = taskSlice.actions;

export const selectTodos = (state: RootState) => state.task.todos;

export default taskSlice.reducer;