import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

        if (!thought) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new thought
export const createThought = async (req: Request, res: Response) => {
    const userId  = req.body.userId;
    try {
        const newThought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { thoughts: newThought } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// update a user
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {$set: req.body},
            {runValidators: true, new: true})
            .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// delete a user
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!deletedThought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(deletedThought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(updatedThought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(updatedThought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
