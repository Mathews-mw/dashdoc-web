import decode from 'jwt-decode';
import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { AuthTokenError } from '@/libs/axios/errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type WithSSRAuthOptions = {
	permissions?: string[];
	roles?: string[];
};

interface tokenDecoded {
	permissions: string[];
	roles: string[];
}

export function withSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
	return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);
		const storegedToken = cookies[`${process.env.NEXT_PUBLIC_TOKEN_KEY}`];

		if (!storegedToken) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}

		if (options) {
			const user = decode<tokenDecoded>(storegedToken);

			const { permissions, roles } = options;

			const userHasValidPermissions = validateUserPermissions({ user, permissions, roles });

			console.log('userHasValidPermissions: ', userHasValidPermissions);

			if (!userHasValidPermissions) {
				return {
					redirect: {
						destination: '/dashboard',
						permanent: false,
					},
				};
			}
		}

		try {
			return await fn(ctx);
		} catch (error) {
			if (error instanceof AuthTokenError) {
				console.log(error);
				destroyCookie(ctx, `${process.env.NEXT_PUBLIC_USER_KEY}`);
				destroyCookie(ctx, `${process.env.NEXT_PUBLIC_TOKEN_KEY}`);
				destroyCookie(ctx, `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY}`);

				return {
					redirect: {
						destination: '/',
						permanent: false,
					},
				};
			}
		}

		return {
			redirect: {
				destination: '/error', // Em caso de um erro não esperado, você pode redirecionar para uma página publica de erro genérico
				permanent: false,
			},
		};
	};
}
