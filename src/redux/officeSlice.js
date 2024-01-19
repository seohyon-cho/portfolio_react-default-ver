import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOffice = createAsyncThunk('office', async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/office.json`);
	const json = await data.json();
	return json.office;
});

const officeSlice = createSlice({
	name: 'office',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchOffice.pending]: state => {
			state.isLoading = true;
		},
		[fetchOffice.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchOffice.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default officeSlice.reducer;
