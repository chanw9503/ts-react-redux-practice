//액션 타입을 선언합니다.
//뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type의 값을 추론하는 과정에서
//action.type 이 string으로 추론되지 않고 'counter/INCREASE'와 같이 실제 문자열 값을 추론 되도록 해줌
import { deprecated, ActionType, createReducer } from 'typesafe-actions';
const { createStandardAction } = deprecated;

const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

//액션 생성함수 리팩토링
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();

//**********************************************
// //액션 생성함수를 선언합니다.
// export const increase = () => ({
//   type: INCREASE,
// });

// export const decrease = () => ({
//   type: DECREASE,
// });

// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   //액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다.
//   // 이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
//   //읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련된 라이브러리를 사용할 수 있게 해줍니다.
//   //다만, 무조건 꼭 따를 필요는 없습니다.
//   payload: diff,
// });
//**********************************************

//액션 객체 타입 준비
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

//**********************************************
//모든 액션 객체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof ____>는 특정 함수의 반환값을 추론해줍니다.
//상단부에서 액션타입을 선언 할 때 as const를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;
//**********************************************

//이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다.
type CounterState = {
  count: number;
};

//초기상태를 선언합니다.
const initialState: CounterState = {
  count: 0,
};

//리듀서를 작성합니다.
//리듀서에서는 state와 함수의 반환값이 일치하도록 작성하세요
//액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

//**********************************************
// function counter(
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// }
//**********************************************
export default counter;
