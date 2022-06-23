import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { pathUserRoles } from '../services/api';
import {
  userRolesPatchRequested,
  userRolesPatchSucceeded,
  userRolesPatchFailed,
  updateUser,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const patchUserRolesThunk : AppThunk = (userName: string, roles: string[]) => async (dispatch) => {
  try {
    dispatch(userRolesPatchRequested());
    const { data: { user } } = await pathUserRoles(userName, roles);
    batch(() => {
      dispatch(updateUser({ ...user, roles }));
      dispatch(userRolesPatchSucceeded());
    });
  } catch (error) {
    dispatch(userRolesPatchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchUserRolesThunk;
