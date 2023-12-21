// store에 요청을 보내는 함수가 있는 곳
import { combineReducers } from 'redux';

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ historyReducer });
export default reducers;
