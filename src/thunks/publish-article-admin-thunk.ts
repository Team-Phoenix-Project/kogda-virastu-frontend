import { AxiosError } from 'axios';
import { publishArticle } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import {
  articlePublishFailed,
  articlePublishRequested,
  articlePublishSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';

const publishArticleAdminThunk: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(articlePublishRequested());
  try {
    await publishArticle(slug);
    dispatch(articlePublishSucceeded());
  } catch (error) {
    dispatch(
      articlePublishFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default publishArticleAdminThunk;
