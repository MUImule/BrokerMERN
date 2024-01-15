import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { sendMessageAction } from '../redux/actions/userAction';

const MessageComponent = ({ recipientId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const data = {
        sender: '65a24e6112f63b323c3cecdf', 
        receiver: recipientId, 
        content: message,
      };
      
      // Dispatch the action and wait for it to complete
      await dispatch(sendMessageAction(data.sender, data.receiver, data.content));
  
      // After the action is dispatched, make the API call
      const response = await axios.post('/api/send-message', data);
  
      console.log('Message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setMessage('');
  };
  

  return (
    <Box>
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send Message
      </Button>
    </Box>
  );
};
export default MessageComponent;