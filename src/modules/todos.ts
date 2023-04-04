//액션 타입 선언

import { deprecated, ActionType, createReducer, createAction } from 'typesafe-actions';
const { createStandardAction } = deprecated;

const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1; // 새로운 항목을 추가 할 때 사용 할 교유 ID 값

//이 액션 생셩 함수의 경우엔 파라미터를 기반하여 커스터마이징된 payload를 설정하므로,
//createAction 이라는 함수를 사용합니다.
//여기서 action은 액션 객체를 만드는 함수입니다.

type AddTodoAction = {
  type: typeof ADD_TODO;
  payload: {
    id: number;
    text: string;
  };
};

export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
});
//payload가 그대로 들어가는 액션생성함수는 정말 간단합니다.
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();

// //액션 생성 함수
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text,
//   },
// });

// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// });

// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// });

//모든 액션 객체들에 대한 타입 준비
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;

const actions = { addTodo, toggleTodo, removeTodo };

type TodosAction = ActionType<typeof actions>;

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[];

//초기 상태 선언
const initialState: TodosState = [];

//리듀서 생성
// function todos(state: TodosState = initialState, action: TodosAction): TodosState {
//   switch (action.type) {
//     case ADD_TODO:
//       return state.concat({
//         //action.payload 객체 안의 값이 모두 유추됩니다.
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false,
//       });
//     case TOGGLE_TODO:
//       return state.map((todo) => {
//         return todo.id === action.payload ? { ...todo, done: !todo.done } : todo;
//       });
//     case REMOVE_TODO:
//       return state.filter((todo) => todo.id !== action.payload);

//     default:
//       return state;
//   }
// }

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload, // id, text 를 이 안에 넣기
      done: false,
    }),
  // 바구조화 할당을 활용하여 payload 값의 이름을 바꿀 수 있음
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) => state.filter((todo) => todo.id !== id),
});

export default todos;
