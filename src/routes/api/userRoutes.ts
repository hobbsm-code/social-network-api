import { Router } from 'express';
const router = Router();
import { getUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/
router.route('/').post(createUser);

// /api/users/:userId
router.route('/:userId').put(updateUser);

// /api/users/:userId
router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

export default router;
