import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchYoutube = createAsyncThunk('youtube', async (opt = { type: 'All' }) => {
	const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
	let pid = '';
	const num = '10';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	opt.type === 'All' && (pid = 'PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	opt.type === '2023' && (pid = 'PLIenA9X9sYejFq450_Ofy4x7tImW-3PUl');
	opt.type === '2022' && (pid = 'PLIenA9X9sYejNn5U9ovCvLIyT9BEkoA_L');
	opt.type === '2021' && (pid = 'PLIenA9X9sYehUWVqjgWzxctrghO8F6mIq');

	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchYoutube.pending]: state => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

// youtubeSlice 라는 reducer가 변경한 전역 데이터 객체를 내보냄.
export default youtubeSlice.reducer;
