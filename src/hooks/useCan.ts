import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { validateUserPermissions } from '../utils/validateUserPermissions';

type UseCanParams = {
	permissions?: string[];
	roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams) {
	const { user, isAuthenticated } = useContext(AuthContext);

	if (!isAuthenticated) {
		return false;
	}

	let userHasValidPermissions = false;

	if (user && user?.permissions && user?.roles) {
		userHasValidPermissions = validateUserPermissions({ user, permissions, roles });
	}

	return userHasValidPermissions;
}
