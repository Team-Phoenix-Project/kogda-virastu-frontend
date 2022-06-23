import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { getUsers } from '../services/api';
import {
  usersFetchRequested,
  usersFetchSucceeded,
  usersFetchFailed,
  setAllUsers,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getAllUsersThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(usersFetchRequested());
    const { data: { users } } = await getUsers();
    batch(() => {
      dispatch(setAllUsers(users));
      dispatch(usersFetchSucceeded());
    });
  } catch (error) {
    dispatch(usersFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllUsersThunk;
