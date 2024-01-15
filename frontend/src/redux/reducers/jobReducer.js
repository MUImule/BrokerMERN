import {
  EDIT_JOB_FAILURE,
  EDIT_JOB_REQUEST,
  EDIT_JOB_SUCCESS,
  GET_JOB_DETAILS_FAILURE,
  GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_SUCCESS,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_RESET,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_RESET,
    REGISTER_JOB_SUCCESS
} from "../constants/jobconstant"
import { DELETE_JOB_FAILURE, DELETE_JOB_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_SUCCESS } from "../constants/userConstant";

export const loadJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
    case JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueLocation: action.payload.setUniqueLocation,
        jobs: action.payload.jobs.map((job) => ({
          ...job,
          status: 'pending', // Set the initial status for each job
        })),
      };
      case DELETE_JOB_SUCCESS:
        console.log('DELETE_JOB_SUCCESS:', action.payload);
        return {
          ...state,
          jobs: state.jobs.filter((job) => job._id !== action.payload),
          loading: false,
          error: null,
        };
      case DELETE_JOB_FAILURE:
        console.log('DELETE_JOB_FAILURE:', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case GET_JOB_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case GET_JOB_DETAILS_SUCCESS:
          const updatedJobs = state.jobs.map((job) =>
            job._id === action.payload._id ? { ...job, ...action.payload } : job
          );
        
          return {
            ...state,
            loading: false,
            jobDetails: action.payload,
            jobs: updatedJobs,
          };
        
      case GET_JOB_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case EDIT_JOB_REQUEST:
  return {
    ...state,
    loading: true,
  };
case EDIT_JOB_SUCCESS:
  console.log('EDIT_JOB_SUCCESS:', action.payload);
  return {
    ...state,
    loading: false,
    success: action.payload.success,
    jobDetails: action.payload.job, // Update the jobDetails in state
    error: null,
  };
case EDIT_JOB_FAILURE:
  console.log('EDIT_JOB_FAILURE:', action.payload);
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
    default:
      return state;
  }
};
  export const getUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_USER_BY_ID_SUCCESS:
        return {
          ...state,
          userById: action.payload,
          loading: false,
        };
      case GET_USER_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  // single job reducer
  export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
      case JOB_LOAD_SINGLE_REQUEST:
        return { loading: true };
      case JOB_LOAD_SINGLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          singleJob: {
            ...action.payload.job,
            status: 'pending', // Set the initial status for the single job
          },
        };
      case JOB_LOAD_SINGLE_FAIL:
        return { loading: false, error: action.payload };
      case JOB_LOAD_SINGLE_RESET:
        return {};
      default:
        return state;
    }
  };
//Registred job;
export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_JOB_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}
        default:
            return state;
    }

};
