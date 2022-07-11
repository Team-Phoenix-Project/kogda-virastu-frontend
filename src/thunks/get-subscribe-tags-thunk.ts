import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchSubscribeTags } from '../services/api';
import {
  subscribeTagsFetchFailed,
  subscribeTagsFetchRequested,
  subscribeTagsFetchSucceeded,
  setSubscribeTags,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getSubscribeTagsThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(subscribeTagsFetchRequested());
    const { data: { tags } } = await fetchSubscribeTags();
    dispatch(setSubscribeTags(tags));
    batch(() => {
      dispatch(setSubscribeTags(tags));
      dispatch(subscribeTagsFetchSucceeded());
    });
  } catch (error) {
    dispatch(subscribeTagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getSubscribeTagsThunk;
