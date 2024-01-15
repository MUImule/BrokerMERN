import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { allUserAction, approveUserAction, getUserByIdAction } from '../../redux/actions/userAction';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = (users !== undefined && users.length > 0) ? users : [];

  const deleteUserById = (e, id) => {
    console.log(id);
  };

  const approveUser = async (id) => {
    try {
      console.log('Before dispatching approveUserAction');
      const responseApprove = await dispatch(approveUserAction(id));
      console.log('Response from approveUserAction:', responseApprove);
      console.log('After dispatching approveUserAction');
      if (responseApprove && responseApprove.success) {
        console.log('Before dispatching getUserByIdAction');
        const responseGetUser = await dispatch(getUserByIdAction(id));
        console.log('Response from getUserByIdAction:', responseGetUser);
        const approvedUserData = responseGetUser?.payload;
        console.log('After dispatching getUserByIdAction');

        dispatch(allUserAction());
      } else {
        console.error('Error approving user. Response:', responseApprove);
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  data = data.filter((user) => user.role === 0 && user.jobsHistory && user.jobsHistory.length > 0);

  const columns = [
    {
      field: '_id',
      headerName: 'User ID',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (values) => (
        <Typography>
          {values.row.firstName} {values.row.lastName}
        </Typography>
      ),
    },
    {
      field: 'appliedJobs',
      headerName: 'Applied Jobs',
      width: 200,
      renderCell: (values) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {values.row.jobsHistory && values.row.jobsHistory.length > 0 ? (
            values.row.jobsHistory.map((job, index) => (
              <Typography key={index}>{job.title}</Typography>
            ))
          ) : (
            <Typography>Not applied for a job</Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'highestEducationLevel',
      headerName: 'Highest Education Level',
      width: 200,
    },
    {
      field: 'fieldOfStudy',
      headerName: 'Field of Study',
      width: 200,
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 120,
      renderCell: (values) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => approveUser(values.row._id)}
          disabled={values.row.approved}
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
          Employees
        </Typography>
        <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              sx={{
                '& .MuiTablePagination-displayedRows': {
                  color: 'white',
                },
                color: 'white',
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) => theme.palette.secondary.main,
                },
                button: {
                  color: '#ffffff',
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Users;
