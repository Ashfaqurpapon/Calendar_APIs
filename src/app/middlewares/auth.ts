import { Request, Response, NextFunction } from 'express';

// Mock users (you can adjust or randomize if you want)
const mockUsers = [
  { userId: 'user1_id', role: 'user' },
  { userId: 'admin1_id', role: 'admin' },
];

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {
  // For simplicity, always assign the first user (you can randomize if needed)
  const mockUser = mockUsers[0]; // [0] = normal user, [1] = admin

  req.user = {
    userId: mockUser.userId,
    role: mockUser.role,
  };

  next();
};
