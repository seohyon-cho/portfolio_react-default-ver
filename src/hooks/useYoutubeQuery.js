import { useQuery } from '@tanstack/react-query';

// 기본 키 값 : opt = 'PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH'
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
