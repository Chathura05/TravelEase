import { ROLES } from '../constants/roles';

export const redirectByRole = (role) => {
  if (role === ROLES.ADMIN) return '/admin';
  if (role === ROLES.MARKETING_MANAGER) return '/marketing';
  if (role === ROLES.FINANCE_MANAGER) return '/finance';
  if (role === ROLES.SUPPORT_AGENT) return '/support';
  return '/dashboard';
};
