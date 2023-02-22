import { GetServerSideProps } from 'next';
import { withSSRGuest } from '@/utils/withSSRGuest';

export { default } from './login';

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
	return {
		props: {},
	};
});
