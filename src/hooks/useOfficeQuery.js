import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchOffice = async () => {
	const response = await fetch(`${path}/DB/office.json`);
	const data = await response.json();
	return data.office;
};

export const useOfficeQuery = () => {
	return useQuery(['fetchOffice'], fetchOffice, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
