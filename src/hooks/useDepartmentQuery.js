import { useQuery } from '@tanstack/react-query';

const fetchDepartment = async ({ queryKey }) => {
	const data = await fetch(queryKey[1]);
	const json = await data.json();
	return json.members;
};

export const useDepartmentQuery = opt => {
	return useQuery(['fetchDepartment', opt], fetchDepartment, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

// const path = process.env.PUBLIC_URL;
// `${path.current}/DB/designer.json`

// json key값 다 members 로 바꾸고 return 을 json.members 로 해도 되나?
