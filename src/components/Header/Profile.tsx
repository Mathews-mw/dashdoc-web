import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProfileProps {
	showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: IProfileProps) {
	return (
		<Flex align='center'>
			{showProfileData && (
				<Box mr='4' textAlign='right'>
					<Text>Mathews Araujo</Text>
					<Text color='gray.300' fontSize='small'>
						mathews.mw@gmail.com
					</Text>
				</Box>
			)}

			<Avatar size='md' name='Mathews Araujo' src='https://github.com/mathews-mw.png' />
		</Flex>
	);
}
