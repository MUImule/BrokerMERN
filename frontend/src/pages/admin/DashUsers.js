import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { allUserAction, sendMessageAction } from '../../redux/actions/userAction';
import MessageComponent from '../../component/MessageComponent';

const DashUsers = () => {
  const [recipientId, setRecipientId] = useState(null);
  const [senderId, setSenderId] = useState(null);

  const dispatch = useDispatch();

  const handleSendMessage = async (message) => {
    try {
      await dispatch(sendMessageAction(message));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSendMessageButton = (values) => {
    const currentUserID = '65756c36647aab15d826ccf0'; // Replace with actual current user ID
    const selectedRecipientId = values.row._id;

    setSenderId(currentUserID);
    setRecipientId(selectedRecipientId);
  };

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);
  let data = users !== undefined && users.length > 0 ? users : [];
  const employerData = data.filter((user) => user.role === 2);
  const employeeData = data.filter((user) => user.role === 0);

  const commonColumns = [
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
      field: 'email',
      headerName: 'E_mail',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'User status',
      width: 150,
      renderCell: (params) => (params.row.role === 2 ? 'Employer' : 'Employee'),
    },
    {
      field: 'Messages',
      width: 200,
      renderCell: (values) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
          <Button onClick={() => handleSendMessageButton(values)}>Send Message</Button>
        </Box>
      ),
    },
  ];
  const employerColumns = [
    ...commonColumns,
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 200,
      description: 'Employer-specific information',
      renderCell: (values) => (values.row.role === 2 ? values.row.companyName : ''),
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 200,
      description: 'Employer-specific information',
      renderCell: (values) => (values.row.role === 2 ? values.row.phoneNumber : ''),
    },
    {
      field: 'companyAddress',
      headerName: 'Company Address',
      width: 200,
      description: 'Employer-specific information',
      renderCell: (values) => (values.row.role === 2 ? values.row.companyAddress : ''),
    },
    // {
    //   field: 'approvedUsers',
    //   headerName: 'Approved Users',
    //   width: 200,
    //   renderCell: (values) => {
    //     const approvedUsers = values.row.approvedUsers;
        
    //     return (
    //       <Box>
    //         {approvedUsers && approvedUsers.length > 0 ? (
    //           approvedUsers.map((user, index) => (
    //             <Typography key={index}>{`${user.firstName} ${user.lastName}`}</Typography>
    //           ))
    //         ) : (
    //           <Typography>No approved users</Typography>
    //         )}
    //       </Box>
    //     );
    //   },
    // },
    
    
  ];  
  const employeeColumns = [
    ...commonColumns,
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

  ];

  return (
    <>
      <Box>
      {recipientId && senderId && (
          <MessageComponent
            recipientId={recipientId}
            senderId={senderId}
            onMessageSent={() => {
              setRecipientId(null);
              setSenderId(null);
            }}
          />
        )}
        <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
          All Users
        </Typography>
        <Box>
          {/* Employer Users Table */}
          <Typography variant="h6" sx={{ color: 'white', pb: 1 }}>
            Employer Users
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
                rows={employerData}
                columns={employerColumns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          </Paper>
        </Box>
        <Box mt={3}>
          {/* Employee Users Table */}
          <Typography variant="h6" sx={{ color: 'white', pb: 1 }}>
            Employee Users
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
                rows={employeeData}
                columns={employeeColumns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default DashUsers;
