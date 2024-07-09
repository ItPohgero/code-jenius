import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ContactState = {
	add?: boolean;
	update?: boolean;
};
const initialState = {
	add: false,
	update: false,
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
		changeContactUpdate: (
			state: ContactState,
			action: PayloadAction<ContactState>,
		) => {
			const { update } = action.payload;
			state.update = update !== undefined ? update : state.update;
		},
	},
});
export const { changeContact, changeContactUpdate, reset } = Contact.actions;
export default Contact.reducer;
