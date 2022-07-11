import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articlePostRequested,
  articlePostSucceeded,
  articlePostFailed,
} from '../store';
import { postArticle, uploadImage } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import { TAPIError } from '../services/api.types';
import { API_ROOT } from '../constants/api.constants';

const postArticleThunk: AppThunk = (file: File) => async (dispatch, getState) => {
  dispatch(articlePostRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, link,
  } = articleData;
  const tagList = makeTagList(articleData.tags || '');
  try {
    if (file) {
      const { data: { url } } = await uploadImage(file);
      await postArticle({
        title,
        description,
        body,
        tagList,
        link: `${API_ROOT}${url}`,
      });
      dispatch(articlePostSucceeded());
    } else {
      await postArticle({
        title,
        description,
        body,
        tagList,
        link,
      });
      dispatch(articlePostSucceeded());
    }
  } catch (error) {
    dispatch(
      articlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default postArticleThunk;
