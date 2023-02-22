type User = {
	permissions?: string[];
	roles?: string[];
};

type ValidateUserPermissionsParams = {
	user: User;
	permissions?: string[];
	roles?: string[];
};

export function validateUserPermissions({ user, permissions, roles }: ValidateUserPermissionsParams) {
	if (permissions && permissions?.length > 0) {
		const hasPermissions = permissions.some((permission) => {
			return user.permissions?.includes(permission);
		});

		if (!hasPermissions) {
			return false;
		}
	}

	if (roles && roles?.length > 0) {
		const allRoles = roles.some((role) => {
			return user.roles?.includes(role);
		});

		if (!allRoles) {
			return false;
		}
	}

	return true;
}
