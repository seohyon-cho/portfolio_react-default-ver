import { createSlice } from '@reduxjs/toolkit';

const darkSlice = createSlice({
	name: 'dark',
	initialState: { isDark: false },
	reducers: {
		darkToggle: state => {
			state.isDark = !state.isDark;
		},
		darkOn: state => {
			state.isDark = true;
		},
		darkOff: state => {
			state.isDark = false;
		}
	}
});

export const { darkToggle, darkOn, darkOff } = darkSlice.actions;

export default darkSlice.reducer;
