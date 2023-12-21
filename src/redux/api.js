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
