import { useContext } from 'react';
import { Panel } from '@/components/Panel';
import { AuthContext } from '@/context/AuthContext';

import { UserInfos } from './Infos';
import { Signature } from './Signature/Index';

import { Avatar, Box, Flex, Grid, GridItem, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, theme } from '@chakra-ui/react';

import user4 from 'public/user4.jpg';

export default function Profile() {
	const { user } = useContext(AuthContext);

	return (
		<Grid templateAreas={`"profile content"`} gridTemplateRows={'auto'} gridTemplateColumns={'1fr 2fr'} gap={6}>
			<GridItem area={'profile'}>
				<Flex w='100%' maxWidth={1320}>
					<Box flex='1' borderRadius={6} bg='white' boxShadow='0 0.5rem 1rem rgb(0 0 0 / 5%)'>
						<Flex direction='column' alignItems='center' borderBottom={`solid 1px ${theme.colors.gray[300]}`}>
							<Flex direction='column' gap={4} p={['8', '10']}>
								<Avatar name='Mathews Araujo' src={user4.src} size='2xl' />
								<Flex direction='column' alignItems='center'>
									<Heading fontWeight='medium' fontSize='lg'>
										{user?.name}
									</Heading>
									<Text>{user?.bio}</Text>
								</Flex>
							</Flex>
						</Flex>

						<Flex direction='column'>
							<Flex direction='column' gap={3} p={['4', '6']}>
								<Box>
									<Text fontSize='sm'>E-mail:</Text>
									<Heading fontWeight='light' fontSize='lg'>
										{user?.email}
									</Heading>
								</Box>
								<Box>
									<Text fontSize='sm'>Phone:</Text>
									<Heading fontWeight='light' fontSize='lg'>
										{user?.phone_number}
									</Heading>
								</Box>
								<Box>
									<Text fontSize='sm'>User Type:</Text>
									<Heading fontWeight='light' fontSize='lg'>
										{user?.permissions}
									</Heading>
								</Box>
							</Flex>
						</Flex>
					</Box>
				</Flex>
			</GridItem>

			<GridItem area={'content'}>
				<Panel>
					<Tabs variant='enclosed'>
						<TabList>
							<Tab>Profile</Tab>
							<Tab>Assinatura</Tab>
							<Tab>Configurações</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<UserInfos />
							</TabPanel>
							<TabPanel>
								<Signature />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Panel>
			</GridItem>
		</Grid>
	);
}
