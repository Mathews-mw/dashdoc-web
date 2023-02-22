import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Input as ChacrkaInput, InputProps as ChacrkaInputProps } from '@chakra-ui/react';

interface InputProps extends ChacrkaInputProps {
	name: string;
	label?: string;
	error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
	return (
		<FormControl isInvalid={!!error}>
			{!!label && <FormLabel htmlFor={name}> {label} </FormLabel>}

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
				ref={ref}
				{...rest}
			/>

			{!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const Input = forwardRef(InputBase);
