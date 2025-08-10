/**
 * Utility functions for managing JWT tokens in localStorage
 */

const TOKEN_KEY = 'opensesame_session';

/**
 * Store JWT token in localStorage
 * @param token - JWT token string
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieve JWT token from localStorage
 * @returns JWT token string or null if not found
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user has a valid token stored
 * @returns boolean indicating if token exists
 */
export const hasToken = (): boolean => {
  return getToken() !== null;
};
