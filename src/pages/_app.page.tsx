import '../libs/dayjs';

import { theme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { queryClient } from '@/libs/react-query';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { SidebarDrawerProvider } from '@/context/SidebarDrawerContext';
import Header from '@/components/Header';
import { SideBar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ChakraProvider theme={theme}>
					<SidebarDrawerProvider>
						<AuthContextProvider>
							<Grid
								templateAreas={`"header header"
              "nav main"
              "nav footer"`}
								gridTemplateRows={'auto 1fr auto'}
								gridTemplateColumns={'minmax(150px, 260px) 1fr'}
								color='blackAlpha.700'
							>
								<GridItem as='header' bg='base.primary' area={'header'} position='fixed' top='0' left='0' zIndex={5} w='100%'>
									<Header />
								</GridItem>
								<GridItem
									as='aside'
									position='fixed'
									bg='gray.100'
									area={'nav'}
									boxShadow='base'
									display='block'
									pt='5rem'
									flexShrink={0}
									h='100vh'
									maxWidth='260px'
									w='100%'
								>
									<SideBar />
								</GridItem>
								<GridItem as='main' area={'main'} display='flex' justifyContent='center' pt='5rem' height='auto' w='100%' maxW='1320px' margin='2rem auto 1rem'>
									<Component {...pageProps} />
								</GridItem>
								<GridItem as='footer' opacity={0.8} area={'footer'}>
									<Footer />
								</GridItem>
							</Grid>
						</AuthContextProvider>
					</SidebarDrawerProvider>
				</ChakraProvider>
			</Hydrate>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
