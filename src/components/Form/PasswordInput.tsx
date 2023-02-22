import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction, useState } from 'react';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as ChacrkaInput,
	InputGroup,
	InputRightElement,
	InputProps as ChacrkaInputProps,
	Button,
	IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface InputProps extends ChacrkaInputProps {
	name: string;
	label?: string;
	error?: FieldError;
}

const PasswordInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, type = 'text', ...rest }, ref) => {
	const [show, setShow] = useState(false);

	const handleClick = () => setShow(!show);

	return (
		<FormControl isInvalid={!!error}>
			{!!label && <FormLabel htmlFor={name}> {label} </FormLabel>}

			<InputGroup display='flex' alignItems='center'>
				<ChacrkaInput
					name={name}
					id={name}
					focusBorderColor='blue.500'
					bgColor='white'
					border='1px solid'
					borderColor='gray.400'
					variant='filled'
					size='lg'
					_hover={{ bgColor: 'gray.200' }}
					type={show ? type : 'password'}
					ref={ref}
					{...rest}
				/>

				<InputRightElement display='flex' h='100%' width='4.5rem'>
					<IconButton
						aria-label='View password'
						colorScheme='gray'
						variant='ghost'
						bg='none'
						_hover={{ bgColor: 'none' }}
						icon={show ? <ViewIcon /> : <ViewOffIcon />}
						onClick={handleClick}
					/>
				</InputRightElement>
			</InputGroup>

			{!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const PasswordInput = forwardRef(PasswordInputBase);
