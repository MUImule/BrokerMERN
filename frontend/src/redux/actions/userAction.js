import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    APPROVE_USER_FAILURE,
    APPROVE_USER_REQUEST,
    APPROVE_USER_SUCCESS,
    FETCH_APPROVER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';
import { GET_APPROVED_JOBS_FAILURE, GET_APPROVED_JOBS_REQUEST, GET_APPROVED_JOBS_SUCCESS, GET_APPROVED_USERS_FAILURE, GET_APPROVED_USERS_REQUEST, GET_APPROVED_USERS_SUCCESS } from '../constants/jobconstant';



export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
      const { data } = await axios.post("/api/signin", user);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: data
      });
      toast.success("Login Successfully!");
  } catch (error) {
      dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error.response.data.error
      });
      toast.error(error.response.data.error);
  }
}


// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
      const { data } = await axios.post("/api/signup", user);

      dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: data
      });
      toast.success("Register Successfully!");
  } catch (error) {
      dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error.response.data.error
      });
      toast.error(error.response.data.error);
  }
}

export const employerSignUpAction  = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("/api/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}
//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
//send message
export const sendMessageAction = (senderId, receiverId, content) => async (dispatch) => {
    try {
      const data = {
        sender: senderId,
        receiver: receiverId,
        content: content,
      };
  
      await axios.post('/api/send-message', data);
  
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: 'Message sent successfully',
      });
      toast.success("Message sent Successfully for this User!");

    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
  
  // recieve message
  export const getMessagesAction = (userId, config) => async (dispatch) => {
    try {
      dispatch({ type: GET_MESSAGES_REQUEST });
  
      const response = await axios.get(`/api/get-messages/${userId}`, config);
  
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: response.data.messages,
      });
    } catch (error) {
      dispatch({
        type: GET_MESSAGES_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
  //approve
export const approveUserAction = (userId) => async (dispatch) => {
    dispatch({ type: APPROVE_USER_REQUEST });
    try {
      const response = await axios.get(`/api/users/approve/${userId}`);
      dispatch({ type: APPROVE_USER_SUCCESS, payload: response.data });
      // Show success toast
      toast.success(`Approved successfully`);
    } catch (error) {
      dispatch({ type: APPROVE_USER_FAILURE, payload: error.message });
      // Show error toast
      toast.error(`Error approving user: ${error.message}`);
    }
  };
  
// Async Action Creator for getUserById
export const getUserByIdAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_USER_BY_ID_REQUEST });
    try {
      const response = await axios.get(`/api/users/approve/${userId}`);
      console.log('getUserByIdAction response:', response);
  
      // Check if the response contains the approvedJobs field
      if (!response.data.hasOwnProperty('approvedJobs')) {
        console.error('getUserByIdAction: Response does not contain approvedJobs field.');
      }
  
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: response.data || {} });
    } catch (error) {
      dispatch({ type: GET_USER_BY_ID_FAILURE, payload: error.message });
    }
  };
// Action Creator
export const getApprovedUsersAction = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/approved');
      console.log('API Response:', response.data); // Log the API response
      dispatch({ type: 'GET_APPROVED_USERS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'GET_APPROVED_USERS_FAILURE', payload: error.message });
    }
  };
// userAction.js
export const fetchUserWithApproverAction = (userId) => async (dispatch) => {
  console.log(`fetchUserWithApproverAction called with userId: ${userId}`);
  try {
      if (!userId) {
          console.error('fetchUserWithApproverAction: userId is not available');
          return;
      }

      console.log('Before API call');
      const user = await axios.get(`/api/users/${userId}`);
      console.log('After API call:', user.data);

      dispatch({ type: FETCH_USER_SUCCESS, payload: user.data });
  } catch (error) {
      console.error('Error fetching user with approver:', error.message);
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
  }
};
