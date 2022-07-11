import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchTopFeed } from '../services/api';
import {
  allPostsRequested,
  allPostsRequestSucceeded,
  allPostsRequestFailed, setAllArticles, setAllArticlesCount,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const getAllTopPostsThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(allPostsRequested());
    const
      { data: { articles, articlesCount } } = await fetchTopFeed();
    batch(() => {
      dispatch(setAllArticles(articles));
      dispatch(setAllArticlesCount(articlesCount));
      dispatch(allPostsRequestSucceeded());
    });
  } catch (error) {
    dispatch(allPostsRequestFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllTopPostsThunk;
