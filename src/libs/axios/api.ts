import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../../context/AuthContext';
import { AuthTokenError } from '@/libs/axios/errors/AuthTokenError';

interface AxiosErrorResponse {
	code?: string;
}

let isRefreshing = false;
let failedRequestQueue: any[] = [];

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {
	let cookies = parseCookies(ctx);

	const api = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
		timeout: 20000,
		headers: {
			Authorization: `Bearer ${cookies[`${process.env.NEXT_PUBLIC_TOKEN_KEY}`]}`,
		},
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError<AxiosErrorResponse>) => {
			if (error.response?.status === 401) {
				if (error.response.data?.code === 'Token invalid') {
					cookies = parseCookies(ctx);

					const storegedRefreshToken = cookies[`${process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY}`];
					const originalConfig = error.config;

					if (!isRefreshing) {
						api
							.post('authenticate/refresh-token', {
								token: storegedRefreshToken,
							})
							.then((response) => {
								const { token, refresh_token } = response.data;

								setCookie(ctx, `${process.env.NEXT_PUBLIC_TOKEN_KEY}`, token, {
									maxAge: 60 * 60 * 24 * 30,
									path: '/',
								});
								setCookie(ctx, `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY}`, refresh_token, {
									maxAge: 60 * 60 * 24 * 30,
									path: '/',
								});

								api.defaults.headers['Authorization'] = `Bearer ${token}`;

								failedRequestQueue.forEach((request) => request.onSucess(token));
								failedRequestQueue = [];
							})
							.catch((err) => {
								failedRequestQueue.forEach((request) => request.onFailure(err));
								failedRequestQueue = [];

								if (process.browser) {
									signOut();
								}
							})
							.finally(() => {
								isRefreshing = false;
							});
					}

					return new Promise((resolve, reject) => {
						failedRequestQueue.push({
							onSucess: (token: string) => {
								if (originalConfig?.headers !== undefined) {
									originalConfig.headers['Authorization'] = `Bearer ${token}`;
									resolve(api(originalConfig));
								}
							},
							onFailure: (err: AxiosError) => {
								reject(err);
							},
						});
					});
				} else {
					if (process.browser) {
						signOut();
					} else {
						return Promise.reject(new AuthTokenError());
					}
				}
			}

			return Promise.reject(error);
		}
	);

	return api;
}
