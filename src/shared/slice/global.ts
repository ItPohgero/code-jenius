import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type GlobalState = {
	status: boolean;
};
const initialState = {
	status: false,
} as GlobalState;

export const Global = createSlice({
	name: "global",
	initialState,
	reducers: {
		reset: () => initialState,
		changeGlobal: (state: GlobalState, action: PayloadAction<GlobalState>) => {
			const { status } = action.payload;
			state.status = status !== undefined ? status : state.status;
		},
	},
});
export const { changeGlobal, reset } = Global.actions;
export default Global.reducer;
