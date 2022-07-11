import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchTopTags } from '../services/api';
import {
  setAllTopTags,
  tagsFetchFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getAllTopTagsThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(tagsFetchRequested());
    const { data: { tags } } = await fetchTopTags();
    dispatch(setAllTopTags(tags));
    batch(() => {
      dispatch(setAllTopTags(tags));
      dispatch(tagsFetchSucceeded());
    });
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllTopTagsThunk;
