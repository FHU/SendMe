import api, { type components } from "@sendme/api";
import { redirect } from "@tanstack/react-router";
import { useState } from "react";

type TUser = components["schemas"]["UserInfo"];

// This is a biome choice. Open to better names
type functionWithVoidReturn = () => void;

interface useUserReturn {
	user: TUser;
	checkIfLoggedIn: functionWithVoidReturn;
	refreshUser: functionWithVoidReturn;
	setUserToLoggedIn: functionWithVoidReturn;
	setUserToLoggedOut: functionWithVoidReturn;
}

/**
 * A custom hook for managing user state. It creates an abstraction for tracking
 * when one is logged in and accessing the user object appropriately if one is logged in.
 * Simply checkIfLoggedIn and do logic from there.
 *
 * checkIfLoggedIn checks if a user is logged in. If one is not, it redirects the
 * user to the login screen.
 *
 * refreshUser re-fetches the user from the backend and redirects to the login screen
 * if one is not logged in.
 *
 * setUserToLoggedIn is a function that sets the state of the user to logged in
 *
 * setUserToLoggedOut is a function that sets the state of the user to logged out.
 *
 * @returns { user, checkIfLoggedIn, refreshUser, setUserToLoggedIn, setUserToLoggedOut }
 */
export const useUser = (): useUserReturn => {
	const queryUser = (): TUser => {
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

	const setUserToLoggedIn = () => setIsLoggedIn(true);
	const setUserToLoggedOut = () => setIsLoggedIn(false);

	const checkIfLoggedIn = (): boolean => {
		if (isLoggedIn) return true;

		throw redirect({
			to: "/auth",
		});
	};

	refreshUser();
	return {
		user,
		checkIfLoggedIn,
		refreshUser,
		setUserToLoggedIn,
		setUserToLoggedOut,
	};
};
