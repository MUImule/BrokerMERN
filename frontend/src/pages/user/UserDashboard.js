import React, { useEffect, useState } from 'react';
import { Typography, Box, IconButton, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import StatComponent from '../../component/StatComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import MessageViewer from '../../component/MessageViewer';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/system';
import moment from 'moment';
import { useSelector } from 'react-redux';

const ColoredIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const UserDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);
  const [userId, setUserId] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    setUserId(user?._id);
  }, [user]);

  const handleMessagesToggle = () => {
    setShowMessages(!showMessages);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
        Employee Dashboard
      </Typography>
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
            value={user && moment(user.createdAt).format('YYYY / MM / DD')}
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
            description="Number of jobs submitted"
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

export default UserDashboard;
