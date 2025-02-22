import { AxiosPromise } from 'axios';
import {
  TAPIArticle,
  TAPIArticles,
  TAPIAuth,
  TAPIComment,
  TAPIComments, TAPIParamsObject, TAPIPatchArticleData,
  TAPIProfile,
  TAPITags,
  TAPIUser,
  TAPITag,
  TAPITopTags,
  TAPIInviteCode,
  TAPIImageUrl,
  TAPIUserData,
  TAPIUsers,
} from '../services/api.types';

export interface IRegisterUser {
  (username: string, email: string, password: string, invitionCode: string, nickname?: string) : AxiosPromise<TAPIAuth>;
}

export interface ILoginUser {
  (email: string, password: string) : AxiosPromise<TAPIAuth>;
}

export interface IGetInviteCode {
  () : AxiosPromise<TAPIInviteCode>;
}

export interface IFetchUser {
  () : AxiosPromise<TAPIAuth>;
}

export interface IPatchUser {
  ({
    username, email, password, bio, image, nickname,
  }: {
    username?: string,
    email?: string,
    password?: string,
    bio?: string,
    image?:string,
    nickname?: string,
  }) : AxiosPromise<TAPIAuth>;
}

export interface IFetchArticles {
  (queryParams?: TAPIParamsObject) : AxiosPromise<TAPIArticles>;
}

export interface IFetchArticle {
  (slug: string) : AxiosPromise<TAPIArticle>;
}

export interface IPostArticle {
  (articleData: TAPIPatchArticleData) : AxiosPromise<TAPIArticle>;
}

export interface IDeleteArticle {
  (slug: string) : AxiosPromise<null>;
}

export interface IPatchArticle {
  (slug: string, data: TAPIPatchArticleData,) : AxiosPromise<TAPIArticle>;
}

export interface ILikeArticle {
  (slug: string) : AxiosPromise<TAPIArticle>;
}

export interface IFetchTags {
  () : AxiosPromise<TAPITags>
}

export interface IFetchTopTags {
  () : AxiosPromise<TAPITopTags>
}

export interface IFetchComments {
  (slug: string) : AxiosPromise<TAPIComments>;
}

export interface IFetchAdminComments {
  (slug: string, comment: string) : AxiosPromise<TAPIComments>;
}

export interface IPostComment {
  (slug: string, body: string) : AxiosPromise<TAPIComment>;
}

export interface IDeleteComment {
  (slug: string, id: string) : AxiosPromise<null>;
}

export interface IProfile {
  (username: string) : AxiosPromise<TAPIProfile | null>
}
export interface ITag {
  (tag: string) : AxiosPromise<TAPITag | null>
}

export interface IUploadImage {
  (file: File) : AxiosPromise<TAPIImageUrl>;
}

export interface IUsers {
  (): AxiosPromise<TAPIUsers>;
}

export interface IPatchUserRoles {
  (username: string, roles: string[]): AxiosPromise<TAPIUserData>;
}

export type {
  TAPIArticle,
  TAPIArticles,
  TAPIComment,
  TAPIComments,
  TAPIProfile,
  TAPITags,
  TAPIUser,
  TAPITag,
  TAPITopTags,
};
