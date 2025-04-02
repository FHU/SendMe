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
 * @returns { user, userIsLoggedIn, refreshUser, setUserToLoggedIn, setUserToLoggedOut }
 */
export const useUser = (): useUserReturn => {
	const userQuery = (): TUser => {
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

	const [user, setUser] = useState<TUser>(userQuery());
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	/**
	 * Gets an instance of the currently logged in user
	 * If no user is logged in, it redirects to the login page
	 *
	 * @returns an instance of the currently logged in user
	 */
	const getUser = () => {
		if (!isLoggedIn) throw redirect({ to: "/auth" });
		return user;
	};

	/**
	 * Refreshes the login for the current user
	 */
	const refreshUser = () => {
		if (isLoggedIn) return;
		setUser(userQuery());
	};

	/**
	 * Sets logged in state to true
	 */
	const setUserToLoggedIn = () => setIsLoggedIn(true);

	/**
	 * Sets logged in state to false
	 */
	const setUserToLoggedOut = () => setIsLoggedIn(false);

	/**
	 * Checks if a user is logged in. If one is not, it redirects the
	 * user to the login screen.
	 */
	const userIsLoggedIn = (): boolean => {
		if (isLoggedIn) return true;

		throw redirect({
			to: "/auth",
		});
	};

	return {
		getUser,
		userIsLoggedIn,
		refreshUser,
		setUserToLoggedIn,
		setUserToLoggedOut,
	};
};
