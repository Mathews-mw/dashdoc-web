import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';
import { theme } from '@chakra-ui/react';

interface IActiveLinkProps extends LinkProps {
	children: ReactElement;
	shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: IActiveLinkProps) {
	const { asPath } = useRouter();

	let isActive = false;

	if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
		isActive = true;
	}

	if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
		isActive = true;
	}

	return (
		<Link {...rest}>
			{cloneElement(children, {
				pt: '4',
				pb: '4',
				color: isActive ? 'main.contrast' : 'gray.800',
				bg: isActive ? 'base.light' : 'none',
				fontWeight: isActive ? 'bold' : 'medium',
				width: '100%',
				height: '100%',
				_hover: { bg: 'base.light' },
				borderRight: isActive ? `solid 4px ${theme.colors.blue[200]}` : 'none',
			})}
		</Link>
	);
}
