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

const youtubeReducer = (state = { youtube: [] }, action) => {
	if (action.type === types.YOUTUBE.start) return state;
	else if (action.type === types.YOUTUBE.success) return { ...state, youtube: action.payload };
	else if (action.type === types.YOUTUBE.fail) return { ...state, youtube: action.payload };
	else return state;
};

const flickrReducer = (state = { flickr: [] }, action) => {
	if (action.type === types.FLICKR.start) return state;
	else if (action.type === types.FLICKR.success) return { ...state, flickr: action.payload };
	else if (action.type === types.FLICKR.fail) return { ...state, flickr: action.payload };
	else return state;
};
const officeReducer = (state = { office: [] }, action) => {
	if (action.type === types.OFFICE.start) return state;
	else if (action.type === types.OFFICE.success) return { ...state, office: action.payload };
	else if (action.type === types.OFFICE.fail) return { ...state, office: action.payload };
	else return state;
};

const modalReducer = (state = { modal: false }, action) => {
	if (action.type === types.MODAL.start) return { ...state, modal: action.payload };
	else return state;
};
const menuReducer = (state = { menu: false }, action) => {
	if (action.type === types.MENU.start) return { ...state, menu: action.payload };
	else return state;
};
const darkReducer = (state = { dark: false }, action) => {
	if (action.type === types.DARK.start) return { ...state, dark: action.payload };
	else return state;
};

const reducers = combineReducers({
	membersReducer,
	historyReducer,
	youtubeReducer,
	flickrReducer,
	officeReducer,
	modalReducer,
	menuReducer,
	darkReducer
});
export default reducers;
