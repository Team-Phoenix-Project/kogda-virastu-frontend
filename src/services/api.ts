/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  API_ROOT,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
  INVITE_ROUTE,
  ARTICLES_ROUTE,
  TOP_ARTICLES_ROUTE,
  FEED_ROUTE, JWT,
  PROFILES_ROUTE,
  TAGS_ROUTE,
  TOP_TAGS_ROUTE,
  UPLOAD_IMAGE_ROUTE,
  ADMIN_ROUTE,
} from '../constants';
import {
  TAPINewUser,
  TAPILoginUser,
  TAPIPatchUser,
  TAPIArticles,
  TAPIParamsObject,
  TAPIArticle,
  TAPITags,
  TAPITopTags,
  TAPIComments,
  TAPIComment,
  TAPIProfile,
  TAPIAuth,
  TAPIPatchUserData,
  TAPIPatchArticleData,
  TAPITag,
  TAPIInviteCode,
  TAPIImageUrl,
  TAPIUsers,
  TAPIUserData,
} from './api.types';
import {
  IDeleteArticle,
  IDeleteComment,
  IFetchAdminComments,
  IFetchArticle,
  IFetchArticles,
  IFetchComments,
  IFetchTags,
  IFetchTopTags,
  IFetchUser,
  IGetInviteCode,
  ILikeArticle,
  ILoginUser,
  IPatchArticle,
  IPatchUser,
  IPostArticle,
  IPostComment,
  IProfile,
  IRegisterUser,
  ITag,
  IUploadImage,
  IUsers,
  IPatchUserRoles,
} from '../types/API.types';

const defaultRequestConfig : AxiosRequestConfig = {
  baseURL: API_ROOT,
  headers: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
};

const makeParams = (
  limit?: number,
  offset?: number,
  tag?: string,
  author?: string,
  favorited?: string,
) : TAPIParamsObject => {
  let res : TAPIParamsObject = {};
  if (limit) {
    res = { ...res, limit };
  }
  if (offset) {
    res = { ...res, offset };
  }
  if (tag) {
    res = { ...res, tag };
  }
  if (author) {
    res = { ...res, author };
  }
  if (favorited) {
    res = { ...res, favorited };
  }
  return res;
};

const makeArticlePatchData = (data : TAPIPatchArticleData) : TAPIPatchArticleData => {
  const {
    title,
    description,
    body,
    tagList,
    link,
  } = data;
  let res : TAPIPatchArticleData = { };
  if (title) {
    res = { ...res, title };
  }
  if (description) {
    res = { ...res, description };
  }
  if (body) {
    res = { ...res, body };
  }
  if (tagList && tagList.length > 0) {
    res = { ...res, tagList };
  }
  if (link) {
    res = { ...res, link };
  }
  return res;
};

export const jwt = {
  set: (value: string) : void => {
    if (value) {
      localStorage.setItem(JWT, `${value}`);
    } else {
      localStorage.removeItem(JWT);
    }
  },
  get: () : string => {
    const res = localStorage.getItem(JWT);
    return res || '';
  },
  test: () : boolean => !!localStorage.getItem(JWT),
  remove: () : void => localStorage.removeItem(JWT),
};

const injectBearerToken = (requestConfig : AxiosRequestConfig) : AxiosRequestConfig => {
  if (jwt.test()) {
    return {
      ...requestConfig,
      headers: {
        ...defaultRequestConfig.headers,
        ...requestConfig.headers,
        Authorization: `Bearer ${jwt.get()}`,
      },
    };
  }
  return requestConfig;
};

const blogAPI : AxiosInstance = axios.create(defaultRequestConfig);

export const registerUser : IRegisterUser = (
  username: string,
  email: string,
  password: string,
  invite: string,
  nickname: string | undefined,
) : AxiosPromise<TAPIAuth> => {
  const registerData : TAPINewUser = {
    user: {
      username, email, password, nickname,
    },
    invite,
  };
  const requestConfig : AxiosRequestConfig = {
    url: REGISTER_ROUTE,
    data: registerData,
    method: 'post',
  };
  return blogAPI(requestConfig);
};

export const fetchCurrentUser : IFetchUser = () : AxiosPromise<TAPIAuth> => {
  const requestConfig: AxiosRequestConfig = {
    url: USER_ROUTE,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const loginUser : ILoginUser = (
  email: string,
  password: string,
) : AxiosPromise<TAPIAuth> => {
  const loginData : TAPILoginUser = {
    user: { email, password },
  };
  const requestConfig : AxiosRequestConfig = {
    url: LOGIN_ROUTE,
    method: 'post',
    data: loginData,
  };
  return blogAPI(requestConfig);
};

export const fetchInviteCode : IGetInviteCode = () : AxiosPromise<TAPIInviteCode> => {
  // const inviteCodeData : TAPIInviteCode = {
  //   id,
  // };
  const requestConfig : AxiosRequestConfig = {
    url: INVITE_ROUTE,
    // headers: { token },
    method: 'post',
    // data: { id },
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const patchCurrentUser : IPatchUser = (
  user: TAPIPatchUserData,
) : AxiosPromise<TAPIAuth> => {
  const makePatchData = (data : TAPIPatchUserData) : TAPIPatchUserData => {
    // const {
    //   username, email, password, bio, image, nickname,
    // } = data;
    let res = {};
    Object.keys(data).forEach((key) => {
      const d = data[key as keyof TAPIPatchUserData];
      if (d) {
        res = { ...res, [key]: d };
      }
    });
    // if (username) {
    //   res = { ...res, username };
    // }
    // if (email) {
    //   res = { ...res, email };
    // }
    // if (password) {
    //   res = { ...res, password };
    // }
    // if (bio) {
    //   res = { ...res, bio };
    // }
    // if (image) {
    //   res = { ...res, image };
    // }
    // if (nickname) {
    //   res = { ...res, nickname };
    // }
    return res;
  };
  const userData: TAPIPatchUserData = makePatchData(user);
  if (userData === {}) {
    return fetchCurrentUser();
  }
  const patchData : TAPIPatchUser = {
    user: userData,
  };

  const requestConfig: AxiosRequestConfig = {
    url: USER_ROUTE,
    data: patchData,
    method: 'put',
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPublicFeed : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const {
    limit, offset, tag, author, favorited,
  } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: ARTICLES_ROUTE,
    params: makeParams(limit, offset, tag, author, favorited),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchTopFeed : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  // const {
  //   limit, offset, tag, author, favorited,
  // } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: TOP_ARTICLES_ROUTE,
    // params: makeParams(limit, offset, tag, author, favorited),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPrivateFeed : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const { limit, offset, tag } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: FEED_ROUTE,
    params: makeParams(limit, offset, tag),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchArticle : IFetchArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchPendingArticle : IFetchArticles = (
  queryParams?: TAPIParamsObject,
) : AxiosPromise<TAPIArticles> => {
  const { limit, offset, tag } = queryParams ?? {};
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/state/pending`,
    params: makeParams(limit, offset, tag),
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postArticle : IPostArticle = (
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const postData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: ARTICLES_ROUTE,
    method: 'post',
    data: postData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const uploadImage: IUploadImage = (file: File) : AxiosPromise<TAPIImageUrl> => {
  const requestConfig : AxiosRequestConfig = {
    url: UPLOAD_IMAGE_ROUTE,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: { file },
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteArticle : IDeleteArticle = (slug: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const patchArticle : IPatchArticle = (
  slug: string,
  articleData: TAPIPatchArticleData,
) : AxiosPromise<TAPIArticle> => {
  const patchData = {
    article: makeArticlePatchData(articleData),
  };

  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}`,
    method: 'put',
    data: patchData,
  };

  return blogAPI(injectBearerToken(requestConfig));
};

export const publishArticle : IFetchArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/${slug}/publish`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const declineArticle : IFetchArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/${slug}/decline`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const removePublishArticle : IFetchArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/${slug}/hold`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postLikeArticle : ILikeArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/favorite`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteLikeArticle : ILikeArticle = (slug: string) : AxiosPromise<TAPIArticle> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/favorite`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchTopTags : IFetchTopTags = () : AxiosPromise<TAPITopTags> => {
  const requestConfig : AxiosRequestConfig = {
    url: TOP_TAGS_ROUTE,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchComments : IFetchComments = (slug: string) : AxiosPromise<TAPIComments> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const publishCommentsAdmin : IFetchAdminComments = (
  slug: string,
  comment: string,
) : AxiosPromise<TAPIComments> => {
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/${slug}/comments/${comment}/publish`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchCommentsAdmin : IFetchComments = (slug: string) : AxiosPromise<TAPIComments> => {
  const requestConfig : AxiosRequestConfig = {
    url: `admin${ARTICLES_ROUTE}/${slug}/comments/state/pending`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postComment : IPostComment = (
  slug: string,
  body: string,
) : AxiosPromise<TAPIComment> => {
  const postData = {
    comment: { body },
  };
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments`,
    method: 'post',
    data: postData,
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteComment : IDeleteComment = (slug: string, id: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${ARTICLES_ROUTE}/${slug}/comments/${id}`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchProfile : IProfile = (username: string) : AxiosPromise<TAPIProfile> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postFollowProfile : IProfile = (username: string) : AxiosPromise<TAPIProfile> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}/follow`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteFollowProfile : IProfile = (username: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${PROFILES_ROUTE}/${username}/follow`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const fetchSubscribeTags : IFetchTags = () : AxiosPromise<TAPITags> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/follow`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const postSubscribeTag : ITag = (tag: string) : AxiosPromise<TAPITag> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/${tag}/follow`,
    method: 'post',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const deleteUnsubscribeTag : ITag = (tag: string) : AxiosPromise<null> => {
  const requestConfig : AxiosRequestConfig = {
    url: `${TAGS_ROUTE}/${tag}/follow`,
    method: 'delete',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const getUsers : IUsers = () : AxiosPromise<TAPIUsers> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${ADMIN_ROUTE}/users`,
    method: 'get',
  };
  return blogAPI(injectBearerToken(requestConfig));
};

export const pathUserRoles: IPatchUserRoles = (
  username: string,
  roles: string[],
) : AxiosPromise<TAPIUserData> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${ADMIN_ROUTE}/users/${username}/roles/`,
    method: 'patch',
    data: { roles },
  };
  return blogAPI(injectBearerToken(requestConfig));
};
