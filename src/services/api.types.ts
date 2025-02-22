import { string } from 'prop-types';
import {
  TArticle, TComment, TProfile, TTags, TUser, TTag, TUserData, TTopTags,
} from '../types/types';

export type TAPINewUser = {
  user: {
    username: string;
    email: string;
    password: string;
    nickname?: string;
  },
  invite: string
};

export type TAPIAuth = {
  user: {
    email: string;
    username: string;
    bio?: string;
    image?: string;
    token: string;
    nickname: string;
    roles: Array<string>;
  };
};

export type TAPILoginUser = {
  user: {
    email: string;
    password: string;
  }
};

export type TAPIInviteCode = {
  code: string;
};

export type TAPIUser = {
  user: TUser;
};

export type TAPIPatchUserData = {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
  nickname?: string;
};

export type TAPIPatchUser = {
  user: TAPIPatchUserData;
};

export type TAPIArticles = {
  articles: Array<TArticle>,
  articlesCount: number,
};

export type TAPIParamsObject = {
  limit?: number,
  offset?: number,
  tag?: string,
  favorited?: string,
  author?: string
};

export type TAPIArticle = {
  article: TArticle;
};

export type TAPIPatchArticleData = {
  title?: string | null;
  description?: string | null;
  body?: string | null;
  tagList?: TTags;
  link?: string | null;
};

export type TAPITags = {
  tags: TTags;
};

export type TAPITopTags = {
  tags: TTopTags;
};

export type TAPIComment = {
  comment: TComment;
};
export type TAPIComments = {
  comments: Array<TComment>;
};

export type TAPIProfile = {
  profile: TProfile;
};

export type TAPIErrors = {
  [error: string]: string;
};
export type TAPIError = {
  errors: TAPIErrors;
  statusCode: number;
};

export type TAPITag = {
  tag: TTag;
}; 

export type TAPIImageUrl = {
  url: string;
};

export type TAPIUsers = {
  users: TUserData [],
  usersCount: number,
}

export type TAPIUserData = {
  user: TUserData,
}
