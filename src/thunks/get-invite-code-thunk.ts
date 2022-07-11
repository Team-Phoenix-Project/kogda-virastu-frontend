import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import { fetchInviteCode } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { inviteCodeFetchFailed, inviteCodeFetchRequested, inviteCodeFetchSucceeded } from '../store/apiSlice';
import { setInvitionCodeProfile } from '../store/profileFormSubSlice';

const getInviteCodeThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(inviteCodeFetchRequested());
    const {
      data: {
        code,
      },
    } = await fetchInviteCode();
    batch(() => {
      dispatch(setInvitionCodeProfile(code));
      dispatch(inviteCodeFetchSucceeded());
    });
  } catch (error) {
    dispatch(inviteCodeFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getInviteCodeThunk;
