import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesAction } from '../redux/actions/userAction';
import { Box, Typography } from '@mui/material';

const MessageViewer = ({ userId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessagesAction(userId));
  }, [dispatch, userId]);

  const messages = useSelector(state => state.allUsers?.messages || []);
  const uniqueMessages = messages.filter(
    (message, index, self) =>
      index === self.findIndex((m) => m._id === message._id)
  );
  return (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', pb: 2 }}>
        Received Messages
      </Typography>
      {messages.map((message) => (
        <Box key={message._id} sx={{ borderBottom: '1px solid #ccc', pb: 2 }}>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {message.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageViewer;
