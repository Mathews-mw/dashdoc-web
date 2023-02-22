import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { api } from '@/libs/axios/apiClient';
import { Input } from '@/components/Form/Input';
import { AuthContext } from '@/context/AuthContext';

import { Plus } from 'phosphor-react';
import { Box, Text, Flex, Icon, VStack, Button, Divider, Heading, Spinner, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Register } from './Register';

export function Signature() {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [loading, setLoading] = useState(false);
	const [userSignature, setUserSignature] = useState();

	async function initialLoading() {
		try {
			setLoading(true);
			const { data: signatureResult } = await api.get(`/assinatura/${user?.id}`);

			setUserSignature(signatureResult);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	return (
		<Flex direction='column' gap={4}>
			<Flex justifyContent='space-between' alignItems='center'>
				<Text fontWeight='semibold'>Sua assinatura</Text>
				<Button size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={Plus} fontSize='18' />} onClick={onOpen}>
					Nova Assinatura
				</Button>
			</Flex>

			<Text>
				Você ainda não possui uma assinatura cadastrada. Lembrando que a assinatura será vinculada ao seu CPF e é única. É possível, também, editá-la em
				qualquer momento.
			</Text>

			<Register onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
		</Flex>
	);
}
