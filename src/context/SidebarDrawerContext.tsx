import { useRouter } from 'next/router';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useEffect } from 'react';

interface ISidebarDrawerContextProps {
	children: ReactNode;
}

type TSidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as TSidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: ISidebarDrawerContextProps) {
	const router = useRouter();
	const disclosure = useDisclosure();

	useEffect(() => {
		disclosure.onClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	return <SidebarDrawerContext.Provider value={disclosure}>{children}</SidebarDrawerContext.Provider>;
}

export const useSidebarDrawerContext = () => useContext(SidebarDrawerContext);
