import { configureStore } from "@reduxjs/toolkit";
import contact from "./slice/contact";

export const store = configureStore({
	reducer: {
		contact,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
