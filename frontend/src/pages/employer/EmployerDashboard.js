import React, { useEffect, useState } from 'react';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { allUserAction } from '../../redux/actions/userAction';
import { jobLoadAction } from '../../redux/actions/jobAction';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import MailIcon from '@mui/icons-material/Mail';
import MessageViewer from '../../component/MessageViewer';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/system';

const ColoredIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
const EmployerDashboard = () => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [jobCategoriesCount, setJobCategoriesCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(5);
  const [userId, setUserId] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const { user } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();
  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { users } = useSelector((state) => state.allUsers);
  const { applications } = useSelector((state) => state.userJobApplication);
  const { jobs } = useSelector((state) => state.loadJobs);

  useEffect(() => {
    setUserId(user?._id);
  }, [user]);

  const handleMessagesToggle = () => {
    setShowMessages(!showMessages);
  };


  useEffect(() => {
    dispatch(allUserAction());
    dispatch(jobLoadAction());
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  useEffect(() => {
    const employees = users.filter((user) => user.role === 0);
    setEmployeesCount(employees.length);
  }, [users]);

  useEffect(() => {
    if (jobType && jobType.length > 0) {
      setJobCategoriesCount(jobType.length);
    }
  }, [jobType]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setJobsCount(jobs.length);
    }
  }, [jobs]);

  useEffect(() => {
    if (applications && applications.length) {
      setApplicationsCount(applications.length);
    }
  }, [applications]);

  const statItems = [
    { count: employeesCount, icon: <SupervisorAccountIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Number of Employees' },
    { count: jobsCount, icon: <WorkIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Jobs' },
    { count: jobCategoriesCount, icon: <CategoryIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Jobs categories' },
    { count: applicationsCount, icon: <TurnedInIcon  sx={{ color: '#fafafa', fontSize: 30 }}/>, description: 'Number of Applications' },
  ];

  const renderStatComponents = () => {
    return statItems.map((item, index) => (
      <StatComponent key={index} value={item.count} icon={item.icon} description={item.description} money="" />
    ));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
       Employer Dashboard
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        {renderStatComponents()}
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: { xs: '100%', sm: '48%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StatComponent
            value={users.length > 0 && moment(users[0].createdAt).format('YYYY / MM / DD')}
            icon={<CalendarMonthIcon sx={{ color: '#fafafa', fontSize: 30 }} />}
            description="Member since"
            money=""
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: { xs: '100%', sm: '48%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
             <StatComponent
            value={user && user.jobsHistory.length}
            icon={<WorkIcon sx={{ color: '#fafafa', fontSize: 30 }} />}
            description="Number of jobs Approved"
            money=""
          />
          <ColoredIconButton onClick={handleMessagesToggle} sx={{ mt: 2 }}>
            <MailIcon />
          </ColoredIconButton>
        </Paper>
      </Stack>
      {showMessages && userId && <MessageViewer userId={userId} />}
    </Box>
  );
};

export default EmployerDashboard;
