import React from 'react';
import { TAPIError } from '../services/api.types';

export type TAuthorHeadingProps = {
  image?: string;
  username: string;
  nickname: string;
  date: Date;
  isAuthor?: boolean;
  isLiked: boolean;
  likesCount: number;
  onDeleteClick?: React.MouseEventHandler<SVGSVGElement>;
  onLikeClick: React.MouseEventHandler<SVGSVGElement>;
};

export type TCommentAuthorHeadingProps = {
  image?: string;
  username: string;
  nickname: string;
  date: Date;
  isAuthor: boolean;
  isAdmin: boolean;
  onDeleteClick?: React.MouseEventHandler<SVGSVGElement>;
};

export type TBriefPostAnnounceProps = {
  image?: string;
  username: string;
  nickname: string;
  title: string;
  date: Date;
  isLiked: boolean;
  likesCount: number;
  onLikeClick: React.MouseEventHandler<SVGSVGElement>;
};

export type TTopAnnounceWidgetProps = {
  caption: string;
};

export type TAuthorProps = {
  userName: string,
  nickname: string,
  createAt: Date,
  imageSrc?: string,
};

export type TCommentInputProps = {
  slug: string;
};

export interface IGenericVoidHandler {
  () : void;
}

export type TModalProps = {
  onClose: IGenericVoidHandler;
  onSubmit: IGenericVoidHandler;
  error?: TAPIError | null;
};

export type TScrollRibbonProps = {
  children: JSX.Element,
};

export type TCommentProps = {
  image?: string;
  createAt: Date;
  username: string;
  nickname: string;
  onDeleteClick?: (commentId: string) => void;
  isAuthor: boolean,
  body: string,
  commentId: string,
  isAdmin?: boolean | null,
};
