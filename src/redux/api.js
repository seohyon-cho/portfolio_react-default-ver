// fetching 함수를 모아놓은 파일 (컴포넌트 외부에서, 비동기 데이터를 호출하는 함수를 한 번에 관리하기 위함.)
const path = process.env.PUBLIC_URL;

export const fetchDepartment = async (opt = { type: 'designer' }) => {
	let file = '';
	opt.type === 'designer' && (file = `${path}/DB/designer.json`);
	opt.type === 'director' && (file = `${path}/DB/director.json`);
	opt.type === 'producer' && (file = `${path}/DB/producer.json`);
	const data = await fetch(file);
	const json = await data.json();
	return json;
};

export const fetchHistory = async () => {
	const data = await fetch(`${path}/DB/history.json`);
	const json = await data.json();
	return json;
};

export const fetchYoutube = async (opt = { type: 'All' }) => {
	let pid = '';
	opt.type === 'All' && (pid = 'PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	opt.type === '2023' && (pid = 'PLIenA9X9sYejFq450_Ofy4x7tImW-3PUl');
	opt.type === '2022' && (pid = 'PLIenA9X9sYejNn5U9ovCvLIyT9BEkoA_L');
	opt.type === '2021' && (pid = 'PLIenA9X9sYehUWVqjgWzxctrghO8F6mIq');

	const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
	const num = '10';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
};
