import express from 'express';
import { MessageType, Messages } from '../messages';
import { Profile } from '../schemas/profileSchema';
import logger from '../logger';
const profileRouter = express.Router();

/* User Profile Create */
profileRouter.post('/', async (req: any, res) => {
    try {
        await Profile.create({ ...req.body, userId: req.user.userId });
        res.json({ error: false, message: Messages.status('Profile', MessageType.ADD) });
    } catch {
        res.status(400).json({ error: true, message: Messages.error });
    }
});

/* User Profile Update */
profileRouter.put('/:id', async (req: any, res) => {
    try {
        const updated = await Profile.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: true, message: Messages.error });
        logger.info(`${req.user.userId} updated.`);
        res.status(201).json({ error: false, message: Messages.status('Profile', MessageType.EDIT) });
    } catch {
        res.status(400).json({ error: true, message: Messages.error });
    }
});

/* User Profile Delete */
profileRouter.delete('/:id', async (req: any, res) => {
    try {
        const deleted = await Profile.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deleted) return res.sendStatus(404);
        logger.info(`${req.user.userId} deleted.`);
        res.json({ error: false, message: Messages.status('Profile', MessageType.DELETE) });
    } catch {
        res.status(400).json({ error: true, message: Messages.error });
    }
});

/* User Profile Get */
profileRouter.get('/', async (req: any, res) => {
    try {
        const profiles = await Profile.find({ userId: req.user.userId });
        res.json(profiles);
    } catch {
        res.status(400).json({ error: true, message: Messages.error });
    }
});

/* User Profile Health Check */
profileRouter.get('/health', (_req, res) => res.send('OK'));

export default profileRouter;