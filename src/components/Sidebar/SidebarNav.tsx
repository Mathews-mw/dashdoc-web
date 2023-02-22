import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

import { Stack } from '@chakra-ui/react';
import { DiamondsFour, GitMerge, Scroll, UserList } from 'phosphor-react';

export function SidebarNav() {
	return (
		<Stack align='flex-start' position='relative' height='100%' overflowY='scroll'>
			<NavSection title='GERAL'>
				<NavLink icon={DiamondsFour} href='/dashboard'>
					Dashborad
				</NavLink>
				<NavLink icon={UserList} href='/register'>
					Usuários
				</NavLink>
			</NavSection>

			<NavSection title='AUTOMAÇÃO'>
				<NavLink icon={Scroll} href='/permissions'>
					Formulários
				</NavLink>
				<NavLink icon={GitMerge} href='/automations'>
					Automação
				</NavLink>
			</NavSection>
		</Stack>
	);
}
