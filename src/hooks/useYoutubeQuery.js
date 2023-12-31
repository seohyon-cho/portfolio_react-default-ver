import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async ({ queryKey }) => {
	const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
	const pid = queryKey[1];
	const num = '10';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	try {
		const data = await fetch(baseURL);
		const json = await data.json();
		return json.items;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeQuery = opt => {
	return useQuery(['fetchYoutube', opt], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

const fetchYoutubeById = async ({ queryKey }) => {
	const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${queryKey[1]}`;

	try {
		const data = await fetch(baseURL);
		const json = await data.json();
		return json.items[0].snippet;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeQueryById = id => {
	return useQuery(['fetchYoutubeById', id], fetchYoutubeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
