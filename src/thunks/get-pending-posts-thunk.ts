import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPendingArticle } from '../services/api';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import {
  pendingPostsRequestSucceeded,
  pendingPostsRequestFailed,
} from '../store/apiSlice';
import { setViewPendingFeed } from '../store/viewSlice';

const getPendingPostsThunk: AppThunk = () => async (dispatch) => {
  try {
    const {
      data: { articles },
    } = await fetchPendingArticle();
    dispatch(pendingPostsRequestSucceeded());
    dispatch(setViewPendingFeed(articles));
  } catch (error) {
    dispatch(
      pendingPostsRequestFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default getPendingPostsThunk;
