import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || '');
        next();
    } catch {
        res.sendStatus(403);
    }
};