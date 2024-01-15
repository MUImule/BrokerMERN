const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, deleteJob, getJobDetails, editJob } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// /api/job/create
router.post('/job/create', isAuthenticated, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
//api/job/delete/job_id
router.delete('/job/delete/:job_id', isAuthenticated, isAdmin, deleteJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);
// /api/jobs/:id
router.get('/jobs/:id', getJobDetails);
// /api/jobsedit/:id
module.exports = router;