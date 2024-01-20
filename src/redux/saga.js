// reducer에 전달되는 초기의 action의 type을 캐치해서, saga 자체적으로 데이터 호출 및 비동기 데이터 상태에 따른 action 객체를 만들어서 reducer에 재전달.
import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory, fetchYoutube, fetchFlickr, fetchOffice } from './api';
import * as types from './actionType';

function* callMembers() {
	yield takeLatest(types.MEMBERS.start, function* (action) {
		try {
			const response = yield call(fetchDepartment, action.opt);
			yield put({ type: types.MEMBERS.success, payload: response.members });
		} catch (err) {
			yield put({ type: types.MEMBERS.fail, payload: err });
		}
	});
}

function* callHistory() {
	yield takeLatest(types.HISTORY.start, function* () {
		try {
			const response = yield call(fetchHistory);
			yield put({ type: types.HISTORY.success, payload: response.history });
		} catch (err) {
			yield put({ type: types.HISTORY.fail, payload: err });
		}
	});
}

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, function* (action) {
		try {
			const response = yield call(fetchYoutube, action.opt);
			yield put({ type: types.YOUTUBE.success, payload: response.items });
		} catch (err) {
			yield put({ type: types.YOUTUBE.fail, payload: err });
		}
	});
}
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, function* (action) {
		try {
			const response = yield call(fetchFlickr, action.opt);
			yield put({ type: types.FLICKR.success, payload: response.photos.photo });
		} catch (err) {
			yield put({ type: types.FLICKR.fail, payload: err });
		}
	});
}

function* callOffice() {
	yield takeLatest(types.OFFICE.start, function* () {
		try {
			const response = yield call(fetchOffice);
			yield put({ type: types.OFFICE.success, payload: response.office });
		} catch (err) {
			yield put({ type: types.OFFICE.fail, payload: err });
		}
	});
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube), fork(callFlickr), fork(callOffice)]);
}
