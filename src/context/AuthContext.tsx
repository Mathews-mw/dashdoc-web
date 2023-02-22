import { api } from '@/libs/axios/apiClient';
import CryptoJS from 'crypto-js';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface SignInCredentials {
	login: string;
	password: string;
}

type TAuthContextData = {
	signIn: (credentials: SignInCredentials) => Promise<void>;
	signOut: () => void;
	loading: boolean;
	user?: IUserView;
	isAuthenticated: boolean;
};

export const AuthContext = createContext({} as TAuthContextData);

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
	destroyCookie(undefined, `${process.env.NEXT_PUBLIC_USER_KEY}`);
	destroyCookie(undefined, `${process.env.NEXT_PUBLIC_TOKEN_KEY}`);
	destroyCookie(undefined, `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY}`);

	if (broadcast) {
		authChannel.postMessage('signOut');
	}

	Router.push('/');
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<IUserView>();
	const isAuthenticated = !!user;

	// console.log('userAuthContext: ', user);

	useEffect(() => {
		authChannel = new BroadcastChannel('auth');

		authChannel.onmessage = (message) => {
			switch (message.data) {
				case 'signOut':
					signOut(false);
					break;
				default:
					break;
			}
		};
	}, []);

	useEffect(() => {
		const cookies = parseCookies();
		const storegedToken = cookies[`${process.env.NEXT_PUBLIC_TOKEN_KEY}`];
		const storegedUser = cookies[`${process.env.NEXT_PUBLIC_USER_KEY}`];

		if (storegedToken && storegedUser) {
			// Decrypt
			const bytes = CryptoJS.AES.decrypt(storegedUser, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
			const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

			api
				.get(`/users/${decryptedUserData.id}`)
				.then((response) => {
					setUser(response.data);
				})
				.catch(() => {
					signOut();
				});
		}
	}, []);

	async function signIn({ login, password }: SignInCredentials) {
		try {
			setLoading(true);
			const response = await api.post('/authenticate', {
				login,
				password,
			});

			const { user, token, refresh_token } = await response.data;

			setCookie(undefined, `${process.env.NEXT_PUBLIC_TOKEN_KEY}`, token, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});
			setCookie(undefined, `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY}`, refresh_token, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});

			// Encrypt
			const encryptUser = CryptoJS.AES.encrypt(JSON.stringify(user), `${process.env.NEXT_PUBLIC_SECRET_KEY}`).toString();

			setCookie(undefined, `${process.env.NEXT_PUBLIC_USER_KEY}`, encryptUser, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});

			setUser(user);

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			setLoading(false);
			Router.push('/dashboard');
		} catch (error) {
			setLoading(false);
			console.log('Error: ', error);
		}
	}

	return <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated, loading }}>{children}</AuthContext.Provider>;
}
