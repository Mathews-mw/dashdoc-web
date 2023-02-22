import { ReactElement } from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface PanelProps {
	children: ReactElement;
}

export function Panel({ children }: PanelProps) {
	return (
		<Flex w='100%' maxWidth={1320}>
			<Box flex='1' borderRadius={6} bg='white' boxShadow='0 0.5rem 1rem rgb(0 0 0 / 5%)' p={['6', '8']}>
				{children}
			</Box>
		</Flex>
	);
}
