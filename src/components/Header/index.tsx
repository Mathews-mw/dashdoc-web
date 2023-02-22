import { Logo } from '../Header/Logo';
import { Profile } from '../Header/Profile';
import { SearchBox } from '../Header/SearchBox';
import { NotificationsNav } from '../Header/NotificationsNav';

import { useSidebarDrawerContext } from '@/context/SidebarDrawerContext';

import { List } from 'phosphor-react';
import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

export default function Header() {
	const { onOpen } = useSidebarDrawerContext();

	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});

	return (
		<Flex w='100%' mx='auto' pt='0.5rem' pb='0.5rem' pl='1rem' pr='1rem' align='center'>
			{!isWideVersion && (
				<IconButton aria-label='Open navigation' icon={<Icon as={List} />} fontSize='24' variant='unstyled' onClick={onOpen} mr='2'></IconButton>
			)}

			<Logo />

			<SearchBox />

			<Flex align='center' ml='auto'>
				<NotificationsNav />

				<Profile showProfileData={isWideVersion} />
			</Flex>
		</Flex>
	);
}
