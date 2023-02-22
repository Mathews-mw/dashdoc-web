import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function withSSRGuest<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
	return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);
		const storegedToken = cookies[`${process.env.NEXT_PUBLIC_TOKEN_KEY}`];

		if (storegedToken) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false,
				},
			};
		}

		return await fn(ctx);
	};
}
