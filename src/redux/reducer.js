// 전역 데이터를 변경하는 함수가 있는 곳. (기존 reducer에 비해 pending, fullfilled, rejected에 대한 추가 분기 작업을 해야함.)
import { combineReducers } from 'redux';
import * as types from './actionType';

const membersReducer = (state = { members: [] }, action) => {
	if (action.type === types.MEMBERS.start) return state;
	else if (action.type === types.MEMBERS.success) return { ...state, members: action.payload };
	else if (action.type === types.MEMBERS.fail) return { ...state, members: action.payload };
	else return state;
};

const historyReducer = (state = { history: [] }, action) => {
	if (action.type === types.HISTORY.start) return state;
	else if (action.type === types.HISTORY.success) return { ...state, history: action.payload };
	else if (action.type === types.HISTORY.fail) return { ...state, history: action.payload };
	else return state;
};

const reducers = combineReducers({ membersReducer, historyReducer });
export default reducers;
