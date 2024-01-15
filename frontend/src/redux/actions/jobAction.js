import axios from 'axios';
import { toast } from 'react-toastify'
import {
    EDIT_JOB_FAILURE,
    EDIT_JOB_REQUEST,
    EDIT_JOB_SUCCESS,
    GET_JOB_DETAILS_FAILURE,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_SUCCESS
} from "../constants/jobconstant"
import { DELETE_JOB_FAILURE, DELETE_JOB_SUCCESS } from '../constants/userConstant';


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}
// register job action
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST });
    try {
      const { data } = await axios.post("/api/job/create", { ...job, status: 'pending' });
      dispatch({
        type: REGISTER_JOB_SUCCESS,
        payload: data,
      });
      toast.success("Job created successfully");
    } catch (error) {
      dispatch({
        type: REGISTER_JOB_FAIL,
        payload: error.response.data.error,
      });
      toast.error(error.response.data.error);
    }
  };
  //delete
  export const deleteJobAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/job/delete/${id}`);
        dispatch({ type: DELETE_JOB_SUCCESS, payload: id });
        toast.success("Job Successfully Deleted!");
    } catch (error) {
        console.error('Error deleting job:', error);
        dispatch({ type: DELETE_JOB_FAILURE, payload: error.message });
    }
};
//edit
export const getJobDetailsAction = (jobId) => async (dispatch) => {
    dispatch({ type: GET_JOB_DETAILS_REQUEST });
    try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        dispatch({ type: GET_JOB_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_JOB_DETAILS_FAILURE, payload: error.message });
    }
};
//update
export const updateJobAction = (jobId, updatedJobData) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_JOB_REQUEST });
  
      const response = await axios.put(`/api/job/update/${jobId}`, updatedJobData);
  
      dispatch({ type: EDIT_JOB_SUCCESS, payload: response.data });
      toast.success("Job Successfully Updated!");
    } catch (error) {
      console.error('Error updating job:', error);
      dispatch({ type: EDIT_JOB_FAILURE, payload: error.message });
    }
  };
 