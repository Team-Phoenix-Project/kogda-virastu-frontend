import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { fetchCommentsAdmin } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { commentsAdminFetchRequested, commentsAdminFetchSucceeded, commentsAdminFetchFailed } from '../store/apiSlice';
import { setViewCommentsFeedAdmin } from '../store';

const getCommentsAdmin: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(commentsAdminFetchRequested());
  try {
    const { data: { comments } } = await fetchCommentsAdmin(slug);
    batch(() => {
      dispatch(setViewCommentsFeedAdmin(comments));
      dispatch(commentsAdminFetchSucceeded());
    });
  } catch (error) {
    dispatch(commentsAdminFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getCommentsAdmin;
