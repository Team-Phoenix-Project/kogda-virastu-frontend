import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postSubscribeTag } from '../services/api';
import {
  subscribeTagRequested,
  subscribeTagSucceeded,
  subscribeTagFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const subscribeTagThunk: AppThunk = (subscribeTag: string) => async (dispatch, getState) => {
  try {
    dispatch(subscribeTagRequested());
    await postSubscribeTag(subscribeTag);
    dispatch(subscribeTagSucceeded());
  } catch (error) {
    dispatch(subscribeTagFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default subscribeTagThunk;
