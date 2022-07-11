import { AxiosError } from 'axios';
import { removePublishArticle } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { articleRemovePublishRequested, articleRemovePublishSucceeded, articleRemovePublishFailed } from '../store/apiSlice';
import { AppThunk } from '../store/store.types';

const removePublishArticleAdminThunk: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(articleRemovePublishRequested());
  try {
    await removePublishArticle(slug);
    dispatch(articleRemovePublishSucceeded());
  } catch (error) {
    dispatch(
      articleRemovePublishFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default removePublishArticleAdminThunk;
