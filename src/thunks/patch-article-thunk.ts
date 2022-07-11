import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articlePatchRequested,
  articlePatchSucceeded,
  articlePatchFailed,
} from '../store';
import { patchArticle, uploadImage } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import makeTagList from '../services/helpers/make-tagList';
import { TAPIError } from '../services/api.types';
import { API_ROOT } from '../constants/api.constants';

const patchArticleThunk: AppThunk = (slug: string, file: File) => async (dispatch, getState) => {
  dispatch(articlePatchRequested());
  const articleData = getState().forms.article ?? {};
  const {
    title, description, body, link,
  } = articleData;
  const tagList = makeTagList(articleData.tags || '');
  try {
    if (file) {
      const { data: { url } } = await uploadImage(file);
      await patchArticle(slug, {
        title,
        description,
        body,
        tagList,
        link: `${API_ROOT}${url}`,
      });
      dispatch(articlePatchSucceeded());
    } else {
      await patchArticle(slug, {
        title,
        description,
        body,
        tagList,
        link,
      });
      dispatch(articlePatchSucceeded());
    }
  } catch (error) {
    dispatch(
      articlePatchFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default patchArticleThunk;
