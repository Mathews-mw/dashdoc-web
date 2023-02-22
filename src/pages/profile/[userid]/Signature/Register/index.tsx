import { z } from 'zod';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as SignatureCanvas from 'react-signature-canvas';

import { api } from '@/libs/axios/apiClient';
import { Input } from '@/components/Form/Input';
import { AuthContext } from '@/context/AuthContext';

import { FloppyDisk, Eraser } from 'phosphor-react';
import {
	Box,
	Button,
	IconButton,
	Divider,
	Flex,
	Heading,
	SimpleGrid,
	Stack,
	HStack,
	VStack,
	Text,
	Spinner,
	FormControl,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	UseDisclosureProps,
} from '@chakra-ui/react';

const signatureFormSchema = z.object({
	base64: z.string({ required_error: 'Campo obrigatório' }),
});

type SignatureFormInputs = z.infer<typeof signatureFormSchema>;

export function Register({ isOpen, onOpen = () => {}, onClose = () => {} }: UseDisclosureProps) {
	const { user } = useContext(AuthContext);
	const router = useRouter();

	const [actionLoading, setActionLoading] = useState(false);
	const [dataURL, setDataURL] = useState<string | null>(null);

	console.log(dataURL);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<SignatureFormInputs>({
		resolver: zodResolver(signatureFormSchema),
	});

	async function handleCreateNewSignature(data: SignatureFormInputs) {
		try {
			setActionLoading(true);
			const { data: result } = await api.post('/assinatura', {
				ASSINATURA: data.base64,
			});

			setDataURL(null);
			reset();
			setActionLoading(false);
			// ShowSuccessRequest(result);
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
		onClose();
		const url = padRef.current?.getTrimmedCanvas().toDataURL('image/png');

		if (url) {
			setDataURL(url);
		}

		if (padRef.current) {
			const dataURL = padRef.current.toDataURL();
			return dataURL;
		}
	};

	return (
		<>
			<Flex direction='column' gap={4}>
				<Text>Gostaria de salvar esta assinatura?</Text>
				<Box bgColor='blue.100' border='1px solid blue.200' borderRadius={6} width='auto'>
					{dataURL ? <img className={'sigImage'} src={dataURL} alt='user generated signature' /> : null}
				</Box>

				<HStack>
					<Button onClick={() => onOpen()}>Editar</Button>
					<Button colorScheme='blue'>Salvar</Button>
				</HStack>
			</Flex>

			<Modal onClose={() => onClose()} isOpen={isOpen || false} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Desenhe sua assinatura</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<SignatureCanvas.default
								ref={padRef}
								penColor='#181B23'
								canvasProps={{
									style: {
										width: '100%',
										height: '15rem',
										border: '4px solid #82a8db',
										borderRadius: '1rem',
										background: '#eef5f9',
									},
								}}
								// onEnd={() => field.onChange(trimCanvas())}
							/>
							<HStack spacing={2} mt='2'>
								<IconButton title='Apagar' aria-label='Apagar' icon={<Eraser size={26} />} onClick={() => clear()} />

								<IconButton
									title='Salvar assinatura'
									aria-label='Salvar assinatura'
									icon={<FloppyDisk size={26} />}
									colorScheme='blue'
									onClick={() => trimCanvas()}
								/>
							</HStack>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
