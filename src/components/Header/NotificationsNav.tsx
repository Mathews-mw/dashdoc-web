import NextLink from 'next/link';
import { useContext } from 'react';
import { HStack, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { AuthContext } from '@/context/AuthContext';
import { BellSimple, UserPlus } from 'phosphor-react';

export function NotificationsNav() {
	const { signOut, user } = useContext(AuthContext);

	return (
		<HStack spacing={['6', '8']} mx={['6', '8']} pr={['6', '8']} py='1' color='gray.300' borderRightWidth={1} borderColor='gray.700'>
			<Icon as={BellSimple} fontSize='20' />
			<LinkBox>
				<LinkOverlay as={NextLink} href={`/profile/${user?.id}`}>
					<Icon as={UserPlus} fontSize='20' />
				</LinkOverlay>
			</LinkBox>
			<button onClick={signOut}>Logout</button>
		</HStack>
	);
}
