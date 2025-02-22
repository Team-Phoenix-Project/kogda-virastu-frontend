import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { batch } from 'react-redux';
import { useDispatch, useSelector } from '../services/hooks';
import { jwt } from '../services/api';
import {
  deleteArticleThunk, getAllTopTagsThunk, getPublicFeedThunk,
  getUserThunk, getAllTopPostsThunk, setTopLikedThunk,
} from '../thunks';
import basicThemes, { defaultTheme } from '../themes/index';
import { closeConfirm, setLanguage, clearErrorObject } from '../store';
import Header from '../widgets/Header';
import Footer from '../widgets/Footer';
import Profile from '../pages/profile';
import NotFound from '../pages/not-found';
import Main from '../pages/main';
import Login from '../pages/login';
import Register from '../pages/register';
import Settings from '../pages/settings';
import ArticlePage from '../pages/article-page';
import Editor from '../pages/editor';
import Administration from '../pages/administration';
import { FeedRibbon, Modal } from '../widgets';
import { IGenericVoidHandler } from '../types/widgets.types';
import getSubscribeTagsThunk from '../thunks/get-subscribe-tags-thunk';
import MainSubscribe from '../pages/main-subscribe';
import MainModeration from '../pages/main-moderation';
import getPendingPostsThunk from '../thunks/get-pending-posts-thunk';

const App = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentLang } = useSelector((state) => state.system);
  const { themes, langNames, vocabularies } = useSelector((state) => state.all);
  const { isDeleteConfirmOpen } = useSelector((state) => state.system);
  const { errorObject } = useSelector((state) => state.api);
  const { username, nickname } = useSelector((state) => state.profile);
  const slug = useSelector((state) => state.view.article?.slug) ?? '';
  const onConfirmDelete : IGenericVoidHandler = () => {
    batch(() => {
      dispatch(deleteArticleThunk(slug));
      dispatch(closeConfirm());
    });
  };
  const onCloseModal : IGenericVoidHandler = () => {
    batch(() => {
      dispatch(clearErrorObject());
      dispatch(closeConfirm());
    });
  };
  const onConfirmClose : IGenericVoidHandler = () => dispatch(closeConfirm());
  useEffect(() => {
    batch(() => {
      dispatch(getAllTopPostsThunk());
      dispatch(getAllTopTagsThunk());
      dispatch(setTopLikedThunk());
      dispatch(getPendingPostsThunk());
      dispatch(getSubscribeTagsThunk());
    });
    if (jwt.test()) {
      batch(() => {
        dispatch(getUserThunk());
        dispatch(getPublicFeedThunk());
      });
    }
  }, [dispatch, username, nickname]);

  useEffect(() => {
    const language = navigator.language.split('-')[0];
    if (langNames.includes(language)) {
      dispatch(setLanguage(language));
    }
  }, [dispatch, langNames]);
  let statusCode = 0;
  if (errorObject?.statusCode) { statusCode = errorObject?.statusCode; }
  return (
    <IntlProvider locale={currentLang} messages={vocabularies[currentLang]}>
      <ThemeProvider theme={
        themes[currentTheme ?? defaultTheme]
        ?? basicThemes[currentTheme ?? defaultTheme]
      }>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Register />} />
          <Route path='/article' element={<MainSubscribe />} />
          <Route path='/article/:slug' element={<ArticlePage />} />
          <Route path='/editArticle' element={<Editor />} />
          <Route path='/editArticle/:slug' element={<Editor />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/admin' element={<Administration />} />
          <Route path='/moderation' element={<MainModeration />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        {isDeleteConfirmOpen && <Modal onClose={onConfirmClose} onSubmit={onConfirmDelete} />}
        {statusCode > 399 && !isDeleteConfirmOpen
          && <Modal onClose={onCloseModal} onSubmit={onCloseModal} error={errorObject} />}
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
