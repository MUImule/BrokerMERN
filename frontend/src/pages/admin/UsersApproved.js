import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Avatar,
  createTheme,
  ThemeProvider,
  Grid,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getApprovedUsersAction, fetchUserWithApproverAction } from '../../redux/actions/userAction';

const customTheme = createTheme({
  // Your theme configuration
});

const useStyles = (theme = customTheme) => ({
  // Your styles
});

const UserApproveComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme) || customTheme;
  const classes = useStyles(theme);

  const { approvedUsers, loading, error, userWithApprover } = useSelector((state) => state.allUsers || {});
  console.log('User with Approver:', userWithApprover);
  
  useEffect(() => {
    dispatch(getApprovedUsersAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchApproverInfo = async () => {
      if (approvedUsers && approvedUsers.length > 0) {
        try {
          const approverPromises = approvedUsers.map(async (user) => {
            if (!user.approver) {
              console.warn(`User ${user._id} has no approver defined. Skipping...`);
              return { ...user, approverInfo: null };
            }
  
            try {
              console.log('Before fetchUserWithApproverAction dispatch:', user);
              const { payload } = await dispatch(fetchUserWithApproverAction(user.approver));
              console.log('After fetchUserWithApproverAction dispatch:', payload);
  
              if (payload && payload._id) {
                return { ...user, approverInfo: payload };
              } else {
                console.error(`Invalid approver info for user ${user._id}:`, payload);
                return { ...user, approverInfo: null };
              }
            } catch (error) {
              console.error(`Error fetching approver info for user ${user._id}:`, error.message);
              return { ...user, approverInfo: null };
            }
          });
  
          const usersWithApprover = await Promise.all(approverPromises);
          console.log('Users with Approver Info:', usersWithApprover);
        } catch (error) {
          console.error('Error fetching approver info for multiple users:', error.message);
        }
      }
    };
  
    fetchApproverInfo();
  }, [approvedUsers, dispatch]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!approvedUsers || approvedUsers.length === 0) {
    return <p>No approved users found</p>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Approved Users
        </Typography>
        <Divider />
        <CardContent className={classes.content}>
          <List>
            {approvedUsers.map((user) => (
              <ListItem key={user._id} className={classes.listItem}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar className={classes.avatar}>
                      <AccountCircleIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container direction="column" spacing={2} className={classes.listItemContent}>
                    <Grid item>
                      <Typography variant="h6">
                        {`${user.firstName} ${user.lastName}`}
                      </Typography>
                    </Grid>
                      <Grid item>
                      <Typography variant="body2">
                      User's ID : {user._id || 'N/A'}
                      </Typography>
                    </Grid>
                      <Grid item>
                      <Typography variant="body2">
                        User's EMAIL: {user.email || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        Highest Education Level: {user.highestEducationLevel || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        Field of Study: {user.fieldOfStudy || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                      Approver: {user.approverInfo ? `${user.approverInfo.user._id} ` : '65915f9ceadf25056087e425'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        Applied Jobs:
                        {user.jobsHistory && user.jobsHistory.length > 0 ? (
                          user.jobsHistory.map((job, index) => (
                            <span key={index}>{index > 0 ? ', ' : ''}{job.title}</span>
                          ))
                        ) : (
                          'N/A'
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UserApproveComponent;
