import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMember = createAsyncThunk('member', async (opt = { type: 'designer' }) => {
	let file = '';
	opt.type === 'designer' && (file = `${process.env.PUBLIC_URL}/DB/designer.json`);
	opt.type === 'director' && (file = `${process.env.PUBLIC_URL}/DB/director.json`);
	opt.type === 'producer' && (file = `${process.env.PUBLIC_URL}/DB/producer.json`);
	const data = await fetch(file);
	const json = await data.json();
	return json.members;
});

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchMember.pending]: state => {
			state.isLoading = true;
		},
		[fetchMember.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchMember.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default memberSlice.reducer;
