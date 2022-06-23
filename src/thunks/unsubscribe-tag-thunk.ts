import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  unsubscribeTagFailed,
  unsubscribeTagRequested,
  unsubscribeTagSucceeded,
} from '../store';
import { deleteUnsubscribeTag } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const unsubscribeTagThunk: AppThunk = (unsubscribeTag: string) => async (dispatch, getState) => {
  try {
    dispatch(unsubscribeTagRequested());
    await deleteUnsubscribeTag(unsubscribeTag);
    dispatch(unsubscribeTagSucceeded());
  } catch (error) {
    dispatch(unsubscribeTagFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default unsubscribeTagThunk;
