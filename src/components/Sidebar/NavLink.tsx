import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

interface INavLinkProps extends ChakraLinkProps {
	icon: ElementType;
	children: string;
	href: string;
}

export function NavLink({ icon, children, href, ...rest }: INavLinkProps) {
	return (
		<ActiveLink href={href} passHref>
			<ChakraLink display='flex' alignItems='center' {...rest} pl='6'>
				<Icon fontSize='20' as={icon} />
				<Text ml='3'>{children}</Text>
			</ChakraLink>
		</ActiveLink>
	);
}
