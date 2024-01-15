const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory, approveUser, getApprovedJobs, getUserWithApprover } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', isAuthenticated, deleteUser);
// /api/user/jobhistory
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);
//users/approve/:id
router.get('/users/approve/:id', approveUser);
//api/approved/
router.get('/approved', getApprovedJobs);
//api/users/userId
router.get('/users/:userId',getUserWithApprover);


module.exports = router;