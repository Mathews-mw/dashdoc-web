import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/Form/Input';
import { PasswordInput } from '@/components/Form/PasswordInput';

import { Box, Heading, Flex, Grid, Button, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const formSchema = z.object({
	login: z.string({ required_error: '*Campo obrigatório' }).email({ message: '*Login inválido' }).min(1, { message: 'Campo obrigatório' }),
	password: z.string({ required_error: '*Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }),
});
type FormData = z.infer<typeof formSchema>;

export default function Home() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const { signIn } = useContext(AuthContext);

	async function handlesigIn(data: FormData) {
		const { login, password } = data;

		await signIn({
			login,
			password,
		});
	}

	return (
		<Box display='flex' h='100vh' alignItems='center' justifyContent='center'>
			<Box
				w='100%'
				h='100%'
				backgroundImage='url(app-preview-bg-black.png)'
				backgroundPosition='right bottom'
				backgroundRepeat='no-repeat'
				backgroundSize='cover'
				backgroundAttachment='fixed'
			>
				<Box display='flex' justifyContent='center' alignItems='center' maxW='50%' height='100%'>
					<Grid
						backgroundColor='main.light'
						borderRadius='md'
						gridGap='5px'
						m={6}
						p={6}
						gridTemplateColumns='repeat(auto-fit, minmax(100px, 1fr))'
						gridTemplateRows='repeat(1, 1fr)'
					>
						<Box as='form' w='100%' onSubmit={handleSubmit(handlesigIn)}>
							<Flex justifyContent='center'>
								<Heading>Login</Heading>
							</Flex>

							<Flex direction='column' gap={2}>
								<Input label='Login' w='100%' error={errors.login} {...register('login')} />
								<PasswordInput label='Senha' w='420px' error={errors.password} {...register('password')} />
							</Flex>

							<Flex alignItems='baseline' gap={4}>
								<Button type='submit' mt='6' colorScheme='blue' isLoading={isSubmitting}>
									Entrar
								</Button>
								<Link href='/register'>
									Não possui cadastro? <ExternalLinkIcon mx='2px' />
								</Link>
							</Flex>
						</Box>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}
