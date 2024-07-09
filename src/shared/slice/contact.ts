import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ContactState = {
	add: boolean;
};
const initialState = {
	add: false,
} as ContactState;

export const Contact = createSlice({
	name: "Contact",
	initialState,
	reducers: {
		reset: () => initialState,
		changeContact: (
			state: ContactState,
			action: PayloadAction<ContactState>,
		) => {
			const { add } = action.payload;
			state.add = add !== undefined ? add : state.add;
		},
	},
});
export const { changeContact, reset } = Contact.actions;
export default Contact.reducer;
