import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ContactState = {
	add?: boolean;
	update?: boolean;
	remove?: boolean;
};
const initialState = {
	add: false,
	update: false,
	remove: false,
} as ContactState;

export const Contact = createSlice({
	name: "Contact",
	initialState,
	reducers: {
		reset: () => initialState,
		changeContactAdd: (
			state: ContactState,
			action: PayloadAction<ContactState["add"]>,
		) => {
			const add = action.payload;
			state.add = add !== undefined ? add : state.add;
		},
		changeContactUpdate: (
			state: ContactState,
			action: PayloadAction<ContactState["update"]>,
		) => {
			const update = action.payload;
			state.update = update !== undefined ? update : state.update;
		},
		changeContactRemove: (
			state: ContactState,
			action: PayloadAction<ContactState["remove"]>,
		) => {
			const remove = action.payload;
			state.remove = remove !== undefined ? remove : state.remove;
		},
	},
});
export const {
	changeContactAdd,
	changeContactUpdate,
	changeContactRemove,
	reset,
} = Contact.actions;
export default Contact.reducer;
