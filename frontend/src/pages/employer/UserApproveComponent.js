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
  Paper,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getApprovedUsersAction } from '../../redux/actions/userAction';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Blue color
    },
    text: {
      primary: '#333', // Dark text color
    },
    background: {
      default: '#fff', // White background color
      paper: '#f5f5f5', // Light gray paper background color
    },
  },
});

const useStyles = (theme = customTheme) => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing?.(4) || 0,
  },
  title: {
    padding: `${theme.spacing?.(2) || 0}px ${theme.spacing?.(2.5) || 0}px ${theme.spacing?.(2) || 0}px`,
    color: theme.palette?.primary?.main || 'inherit',
  },
  avatar: {
    color: theme.palette?.primary?.contrastText || 'inherit',
    backgroundColor: theme.palette?.primary?.main || 'inherit',
  },
  content: {
    backgroundColor: theme.palette?.background?.paper || 'inherit',
  },
  listItem: {
    border: `1px solid ${theme.palette?.primary?.main || 'inherit'}`,
    borderRadius: theme.shape?.borderRadius || 0,
    marginBottom: theme.spacing?.(2) || 0,
  },
  listItemContent: {
    padding: theme.spacing?.(2) || 0,
  },
});

const UserApproveComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme) || customTheme;
  const classes = useStyles(theme);


  const { approvedUsers, loading, error } = useSelector((state) => state.allUsers || {});

  useEffect(() => {
    dispatch(getApprovedUsersAction());
  }, [dispatch]);
  console.log('Approved Users:', approvedUsers);

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