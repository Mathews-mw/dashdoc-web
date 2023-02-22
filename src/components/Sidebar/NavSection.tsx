import { ReactNode } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

interface INavSectionProps {
	title: string;
	children: ReactNode;
}

export function NavSection({ title, children }: INavSectionProps) {
	return (
		<Box w='100%'>
			<Text fontWeight='bold' mt='2' pl='4' color='gray.600' fontSize='small'>
				{title}
			</Text>
			<Stack align='strech' w='100%'>
				{children}
			</Stack>
		</Box>
	);
}
