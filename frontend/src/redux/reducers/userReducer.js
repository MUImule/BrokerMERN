import {  GET_APPROVED_USERS_FAILURE, GET_APPROVED_USERS_REQUEST } from "../constants/jobconstant"
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_RESET,
    ALL_USER_LOAD_SUCCESS,
    APPROVE_USER_FAILURE,
    APPROVE_USER_REQUEST,
    APPROVE_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_RESET,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_RESET,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_RESET, USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_RESET,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_RESET,
    USER_SIGNUP_SUCCESS
} from "../constants/userConstant"


// sign In reducer
export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case USER_SIGNIN_SUCCESS:
            return {

                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }

}
// sign up reducer
export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userSignUp: action.payload,
            }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    }
}

//user profile
export const userReducerProfile = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
        case USER_LOAD_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
            }
        case USER_LOAD_FAIL:
            return { loading: false, user: null, error: action.payload }
        case USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//log out reducer
export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_RESET:
            return {}
        default:
            return state;
    }

}
// userApplyJobReducer.js
export const userApplyJobReducer = (state = { userJobApplications: [] }, action) => {
    switch (action.type) {
      case USER_APPLY_JOB_REQUEST:
        return { ...state, loading: true };
        case USER_APPLY_JOB_SUCCESS:
            return {
              ...state,
              loading: false,
              userJobApplications: [...state.userJobApplications, action.payload],
            };
          
      case USER_APPLY_JOB_FAIL:
        return { ...state, loading: false, error: action.payload };
      case USER_APPLY_JOB_RESET:
        return { userJobApplications: [] };
      default:
        return state;
    }
  };
  

//all users reducer
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
          return { loading: true, users: [] };
        case ALL_USER_LOAD_SUCCESS:
          return {
            loading: false,
            users: action.payload.users,
          };
        case ALL_USER_LOAD_FAIL:
          return { loading: false, users: [], error: action.payload };
        case ALL_USER_LOAD_RESET:
          return {};
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
            case GET_APPROVED_USERS_REQUEST:
                return { ...state, loading: true, error: null };
            case 'GET_APPROVED_USERS_SUCCESS':
                console.log('New State:', { ...state, approvedUsers: action.payload });
                return { ...state, approvedUsers: action.payload };
            case GET_APPROVED_USERS_FAILURE:
                return { ...state, loading: false, error: action.payload };
                case FETCH_USER_SUCCESS:
                    console.log('FETCH_USER_SUCCESS:', action.payload);
                    return {
                        ...state,
                        userWithApprover: action.payload,
                        loading: false,
                        error: null,
                    };
                
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_MESSAGES_REQUEST:
        case SEND_MESSAGE_SUCCESS:
          return {
            ...state,
            loading: true,
            error: null, 
          };
    
        case GET_MESSAGES_SUCCESS:
          return {
            ...state,
            loading: false,
            messages: action.payload,
          };
    
        case SEND_MESSAGE_FAILURE:
        case GET_MESSAGES_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    

              default:
          return state;
      }
    };
// approve for a job reducer
export const userApproveReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_USER_REQUEST:
            return { loading: true };
        case APPROVE_USER_SUCCESS:
            return {
                loading: false,
                approvedJob: action.payload.job,
                successMessage: action.payload.message,
            };
        case APPROVE_USER_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};