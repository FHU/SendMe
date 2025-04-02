import api, { type components } from "@sendme/api";
import { redirect } from "@tanstack/react-router";
import { useState } from "react";

type TUser = components["schemas"]["UserInfo"];

interface useUserReturn {
	getUser: () => TUser;
	userIsLoggedIn: () => boolean;
	refreshUser: () => void;
	setUserToLoggedIn: () => void;
	setUserToLoggedOut: () => void;
}

/**
 * A custom hook for managing user state. It creates an abstraction for tracking
 * when one is logged in and accessing the user object appropriately if one is logged in.
 * Simply check if userIsLoggedIn and do work from there.
 *
 * userIsLoggedIn checks if a user is logged in. If one is not, it redirects the
 * user to the login screen.
 *
 * refreshUser re-fetches the user from the backend and redirects to the login screen
 * if one is not logged in.
 *
 * setUserToLoggedIn is a function that sets the state of the user to logged in
 *
 * setUserToLoggedOut is a function that sets the state of the user to logged out.
 *
 * @returns { user, userIsLoggedIn, refreshUser, setUserToLoggedIn, setUserToLoggedOut }
 */
export const useUser = (): useUserReturn => {
	const queryUser = (): TUser => {
		// This is my current understanding of how to get a user object.
		// I suspect I will be adding a get user endpoint to the backend soon.
		const { data } = api.auth.getMe.useQuery();

		// If no user exists, redirect to a creation page... for now a login
		if (!data) {
			throw redirect({
				to: "/auth",
			});
		}
		return data;
	};

	const [user, setUser] = useState<TUser>(queryUser());
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const refreshUser = () => {
		if (isLoggedIn) return;
		setUser(queryUser());
	};

	const getUser = () => {
		if (!isLoggedIn) throw redirect({ to: "/auth" });
		return user;
	};

	const setUserToLoggedIn = () => setIsLoggedIn(true);
	const setUserToLoggedOut = () => setIsLoggedIn(false);

	const userIsLoggedIn = (): boolean => {
		if (isLoggedIn) return true;

		throw redirect({
			to: "/auth",
		});
	};

	setUser(queryUser());
	return {
		getUser,
		userIsLoggedIn,
		refreshUser,
		setUserToLoggedIn,
		setUserToLoggedOut,
	};
};
