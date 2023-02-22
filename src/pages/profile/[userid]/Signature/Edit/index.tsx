import { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as SignatureCanvas from 'react-signature-canvas';

import { FloppyDisk, Eraser } from 'phosphor-react';
import {
	Box,
	Flex,
	Text,
	Button,
	HStack,
	VStack,
	Divider,
	Heading,
	Spinner,
	IconButton,
	SimpleGrid,
	useDisclosure,
	FormControl,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/libs/axios/apiClient';
import { Input } from '@/components/Form/Input';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

const signatureFormSchema = z.object({
	base64: z.string({ required_error: 'Campo obrigatório' }),
});

type SignatureFormInputs = z.infer<typeof signatureFormSchema>;

export function Editar() {
	const router = useRouter();
	const userid = router.query.userid;
	const cancelRef = useRef();
	const { user } = useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [actionLoading, setActionLoading] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [dataURL, setDataURL] = useState<string | null>(null);
	const [userSignature, setUserSignature] = useState();

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<SignatureFormInputs>({
		resolver: zodResolver(signatureFormSchema),
	});

	async function initialLoading() {
		try {
			setLoading(true);
			const { data: signatureResult } = await api.get(`/assinatura/${user?.id}`);

			setUserSignature(signatureResult);
			setDataURL(signatureResult.ASSINATURA);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			// ShowErrorRequest(error);
			router.push('/');
		}
	}

	async function handleEditSignature(data: SignatureFormInputs) {
		console.log(data);
		try {
			setActionLoading(true);
			const { data: result } = await api.put(`/assinatura/${userid}`, {
				ASSINATURA: data.base64,
			});

			setDataURL(null);
			// reset();
			setActionLoading(false);
			// ShowSuccessRequest(result);
			router.push('/assinaturas/visualizar');
		} catch (error) {
			setActionLoading(false);
			// ShowErrorRequest(error);
		}
	}

	const padRef = useRef<SignatureCanvas.default>(null);

	const clear = () => {
		padRef.current?.clear();
	};

	const trimCanvas = () => {
		const url = padRef.current?.getTrimmedCanvas().toDataURL('image/png');

		if (url) {
			setDataURL(url);
		}

		if (padRef.current) {
			const dataURL = padRef.current.toDataURL();
			return dataURL;
		}

		onClose();
	};

	useEffect(() => {
		initialLoading();
	}, []);

	return (
		<>
			<Box>
				<Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
					<Box as='form' flex='1' borderRadius={8} bg='base.card' p={['6', '8']}>
						<Heading size='xl' fontWeight='normal'>
							Cadastro de assinatura
							{actionLoading && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
						</Heading>

						<Divider my='6' borderColor='gray.500' />

						<Text>Sua nova assinatura será vinculada apenas em novos documentos assinados.</Text>

						<VStack spacing='4' mt='10'>
							<SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
								<Input type='text' name='name' label='Name' value={user?.name} isReadOnly />
								<Input type='text' name='bio' label='Bio' value={user?.bio} isReadOnly />
								<Input type='text' name='cpf' label='CPF' value={`********${user?.cpf.slice(8)}`} isReadOnly />
							</SimpleGrid>
						</VStack>

						<Button title='Criar assinatura' colorScheme='teal' onClick={onOpen} mt='4'>
							Editar Assinatura
						</Button>

						<Box mt='2' bgColor='blue.100' border='1px solid blue.200' borderRadius={6} width='auto'>
							{dataURL ? <img className={'sigImage'} src={dataURL} alt='user generated signature' /> : null}
						</Box>
					</Box>
				</Flex>
			</Box>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Controller
							name='base64'
							control={control}
							render={({ field }) => {
								return (
									<FormControl>
										<SignatureCanvas.default
											ref={padRef}
											penColor='#319795'
											canvasProps={{
												style: {
													width: '100%',
													height: '15rem',
													border: '4px solid #90CDF4',
													borderRadius: '1rem',
													background: '#EBF8FF',
												},
											}}
											onEnd={() => field.onChange(trimCanvas())}
										/>
										<HStack spacing={2} mt='2'>
											<IconButton title='Apagar' aria-label='Apagar' icon={<Eraser size={26} />} onClick={() => clear()} />

											<IconButton
												title='Salvar assinatura'
												aria-label='Salvar assinatura'
												icon={<FloppyDisk size={26} />}
												colorScheme='blue'
												onClick={trimCanvas}
											/>
										</HStack>
									</FormControl>
								);
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
