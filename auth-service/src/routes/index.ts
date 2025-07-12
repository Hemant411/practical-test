import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/userSchema';
import { MessageType, Messages } from '../messages';
import logger from '../logger';
const authRouter = express.Router();

/* User SignUp */
authRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        await User.create({ email, password: hashed })
        return res.status(201).json({ error: false, message: Messages.status('User', MessageType.ADD) });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({ message: `${Object.keys(err.keyValue)[0]} ${Messages.duplicate}` });
        }
        return res.status(400).json({ message: Messages.error });
    };
});

/* User Login */
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ error: true, message: Messages.missmatch });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    logger.info(`${user.email} logged in.`);
    res.json({ token, error: false });
});

/* API Health Check */
authRouter.get('/health', (_req, res) => res.send('OK'));

export default authRouter;