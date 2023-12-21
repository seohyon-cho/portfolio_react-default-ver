// 전역 데이터가 관리되는 곳
import { createStore } from 'redux';
import reducers from './reducer';

const store = createStore(reducers);

export default store;
