import { SidebarNav } from './SidebarNav';

import { useSidebarDrawerContext } from '@/context/SidebarDrawerContext';

import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react';

export function SideBar() {
	const { isOpen, onClose } = useSidebarDrawerContext();

	const isDrawerSideBar = useBreakpointValue({
		base: true,
		lg: false,
	});

	if (isDrawerSideBar) {
		return (
			<Drawer isOpen={isOpen} placement='left' onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent bg='gray.800' p='4'>
						<DrawerCloseButton mt='6' />
						<DrawerHeader>Navegação</DrawerHeader>

						<DrawerBody>
							<SidebarNav />
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		);
	}

	return (
		<Box className='wrapperSideBar' position='relative' zIndex={2} h='100%' maxWidth='260px' w='100%' overflowY='auto'>
			<SidebarNav />
		</Box>
	);
}
