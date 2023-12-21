// : 전역 객체를 생성하는 곳. saga 미들웨어 추가 예정.
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
