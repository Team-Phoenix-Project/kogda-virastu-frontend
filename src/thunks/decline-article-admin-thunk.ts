import { AxiosError } from 'axios';
import { declineArticle } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import {
  articleDeclineRequested,
  articleDeclineSucceeded,
  articleDeclineFailed,
} from '../store/apiSlice';
import { AppThunk } from '../store/store.types';

const declineArticleAdminThunk: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(articleDeclineRequested());
  try {
    await declineArticle(slug);
    dispatch(articleDeclineSucceeded());
  } catch (error) {
    dispatch(
      articleDeclineFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default declineArticleAdminThunk;
