import { Request, Response, NextFunction } from 'express';

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = user.role.toUpperCase();
    const normalizedAllowed = allowedRoles.map(r => r.toUpperCase());

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();
  };
}
