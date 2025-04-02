import api, { type components } from '@sendme/api';
import { redirect } from '@tanstack/react-router';
import { useState } from 'react';

export type TUser = components['schemas']['User'];

/**
 * A custom hook for managing user state. It creates an abstraction for tracking
 * when one is logged in and accessing the user object appropriately if one is logged in.
 * Simply check if userIsLoggedIn and do work from there.
 *
 * @returns { getUser: () => TUser, userIsLoggedIn: () => boolean, refreshUser: () => void, setUserToLoggedIn: () => void, setUserToLoggedOut: () => void; }
 */
export const useUser = (): {
  getUser: () => TUser;
  userIsLoggedIn: () => boolean;
  refreshUser: () => void;
  setUserToLoggedIn: () => void;
  setUserToLoggedOut: () => void;
} => {
  const userQuery = (): TUser => {
    // This is my current understanding of how to get a user object.
    // I suspect I will be adding a get user endpoint to the backend soon.
    const { data } = api.auth.getMe.useQuery();

    // If no user exists, redirect to a creation page... for now a login
    if (!data) {
      throw redirect({
        to: '/auth',
      });
    }

    return data;
  };

  const [user, setUser] = useState<TUser>();

  /**
   * Gets an instance of the currently logged in user
   * If no user is logged in, it redirects to the login page
   *
   * @returns { TUser } an instance of the currently logged in user
   */
  const getUser = (): TUser => {
    if (!user) throw redirect({ to: '/auth' });
    return user;
  };

  /**
   * Refreshes the login for the current user
   */
  const refreshUser = () => {
    if (!user) throw redirect({ to: '/auth' });
    setUser(userQuery());
  };

  /**
   * Sets logged in state to true
   */
  const setUserToLoggedIn = () => setUser(userQuery());

  /**
   * Sets logged in state to false
   */
  const setUserToLoggedOut = () => setUser(undefined);

  /**
   * Checks if a user is logged in. If one is not, it redirects the
   * user to the login screen.
   */
  const userIsLoggedIn = (): boolean => {
    if (user) return true;

    throw redirect({
      to: '/auth',
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
