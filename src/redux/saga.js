// reducer에 전달되는 초기의 action의 type을 캐치해서, saga 자체적으로 데이터 호출 및 비동기 데이터 상태에 따른 action 객체를 만들어서 reducer에 재전달.
import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment } from './api';
import * as types from './actionType';

function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

function* returnMembers() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.MEMBERS.success, payload: response.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callMembers)]);
}
