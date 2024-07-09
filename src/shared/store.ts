import { configureStore } from "@reduxjs/toolkit";
import global from "./slice/global";

export const store = configureStore({
	reducer: {
		global,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
