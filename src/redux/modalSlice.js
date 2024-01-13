import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { open: false },
	reducers: {
		modalOpen: state => {
			state.open = true;
		},
		modalClose: state => {
			state.open = false;
		}
	}
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
