// fetching 함수를 모아놓은 파일 (컴포넌트 외부에서, 비동기 데이터를 호출하는 함수를 한 번에 관리하기 위함.)
const path = process.env.PUBLIC_URL;

export const fetchDepartment = async (file = `${path.current}/DB/designer.json`) => {
	const data = await fetch(file);
	const json = await data.json();
	return Object.values(json)[0];
};
