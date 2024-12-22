import { Router } from 'express';
const router = Router();
import { getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought,
    addReaction,
    deleteReaction } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

// /api/thoughts/
router.route('/').post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').put(updateThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
