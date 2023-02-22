import { api } from '@/libs/axios/apiClient';
import { Box, Button, Center, Flex, Icon, ListItem, SimpleGrid, Spinner, Text, theme, UnorderedList } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';

export function UserInfos() {
	const router = useRouter();
	const userid = router.query.userid;

	const { data: user, isLoading } = useQuery<IUserView>(['user', userid], async () => {
		const { data } = await api.get(`/users/${userid}`);
		return data;
	});

	if (isLoading) {
		return (
			<Flex>
				<Text>Carregando dados...</Text>
				<Spinner colorScheme='blue' />
			</Flex>
		);
	}

	return (
		<Box>
			<SimpleGrid columns={2} spacing={4}>
				<Flex direction='column' gap={1}>
					<Text>Nome</Text>
					<Text fontWeight='semibold'>{user?.name}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>E-mail</Text>
					<Text fontWeight='semibold'>{user?.email}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>Empresa</Text>
					<Text fontWeight='semibold'>{user?.company}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>Bio</Text>
					<Text fontWeight='semibold'>{user?.bio}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>Contato</Text>
					<Text fontWeight='semibold'>{user?.phone_number}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>CPF</Text>
					<Text fontWeight='semibold'>{user?.cpf}</Text>
				</Flex>

				<Flex direction='column' gap={1}>
					<Text>Data de cadastro</Text>
					<Text fontWeight='semibold'>{dayjs(user?.created_at).format('DD/MM/YYYY')}</Text>
				</Flex>
			</SimpleGrid>

			<Center height='auto' m='1rem 0' borderBottom={`solid 1px ${theme.colors.gray[300]}`}></Center>

			<Flex direction='column' gap={4}>
				<Flex direction='column'>
					<Text fontWeight='semibold'>Permissões</Text>
					<UnorderedList>
						{user?.permissions?.map((permission) => {
							return <ListItem key={permission}>{permission}</ListItem>;
						})}
					</UnorderedList>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='semibold'>Funções</Text>
					<UnorderedList>
						{user?.roles?.map((role) => {
							return <ListItem key={role}>{role}</ListItem>;
						})}
					</UnorderedList>
				</Flex>
			</Flex>
		</Box>
	);
}
