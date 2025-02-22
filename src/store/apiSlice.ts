import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAPIError } from '../services/api.types';

type TAPIState = {
  successMessage: string | null,
  errorMessage: string | null,
  errorObject: TAPIError | null,
  isUserRegistering: boolean,
  isUserFetching: boolean,
  isUserLoggingIn: boolean,
  isUserPatching: boolean,
  isUsersFetching: boolean,
  isUserRolesPatching: boolean,
  isPublicFeedFetching: boolean,
  isArticleFetching: boolean,
  isArticleNotFound: boolean,
  isPrivateFeedFetching: boolean,
  isArticlePosting: boolean,
  isArticlePostingSucceeded: boolean,
  isArticleDeleting: boolean,
  isArticleRemoved: boolean,
  isArticlePatching: boolean,
  isArticlePatchingSucceeded: boolean,
  isArticlePublishing: boolean,
  isArticlePublishingSucceeded: boolean,
  isArticleDeclining: boolean,
  isArticleDecliningSucceeded: boolean,
  isArticleRemovePublishing: boolean,
  isArticleRemovePublishingSucceeded: boolean,
  isLikeArticlePosting: boolean,
  isLikeArticleDeleting: boolean,
  isTagsFetching: boolean,
  isCommentsFetching: boolean,
  isCommentsAdminFetching: boolean,
  isCommentPosting: boolean,
  isCommentDeleting: boolean,
  isProfileFetching: boolean,
  isProfileNotFound: boolean,
  isFollowProfilePosting: boolean,
  isFollowProfileDeleting: boolean,
  isSettingsPatching: boolean,
  isSettingsUpdateSucceeded: boolean,
  isAllPostsRequested: boolean,
  isPendingPostsRequested: boolean,
  isTagSubscribed: boolean,
  isUnsubscribeTagDeleting: boolean,
  isSubscribeTagsFetching: boolean,
};

const initialState : TAPIState = {
  successMessage: null,
  errorMessage: null,
  errorObject: null,
  isUserRegistering: false,
  isUserLoggingIn: false,
  isUserFetching: false,
  isUserPatching: false,
  isUsersFetching: false,
  isUserRolesPatching: false,
  isPublicFeedFetching: false,
  isArticleFetching: false,
  isArticleNotFound: false,
  isPrivateFeedFetching: false,
  isArticlePosting: false,
  isArticlePostingSucceeded: false,
  isArticleDeleting: false,
  isArticleRemoved: false,
  isArticlePatching: false,
  isArticlePatchingSucceeded: false,
  isArticlePublishing: false,
  isArticlePublishingSucceeded: false,
  isArticleDeclining: false,
  isArticleDecliningSucceeded: false,
  isArticleRemovePublishing: false,
  isArticleRemovePublishingSucceeded: false,
  isLikeArticlePosting: false,
  isLikeArticleDeleting: false,
  isTagsFetching: false,
  isCommentsFetching: false,
  isCommentsAdminFetching: false,
  isCommentPosting: false,
  isCommentDeleting: false,
  isProfileFetching: false,
  isProfileNotFound: false,
  isFollowProfilePosting: false,
  isFollowProfileDeleting: false,
  isSettingsPatching: false,
  isSettingsUpdateSucceeded: false,
  isAllPostsRequested: false,
  isPendingPostsRequested: false,
  isTagSubscribed: false,
  isUnsubscribeTagDeleting: false,
  isSubscribeTagsFetching: false,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSuccessMessage: (state, action: PayloadAction<string>) => ({
      ...state, successMessage: action.payload,
    }),
    clearSuccessMessage: (state) => ({
      ...state, successMessage: null,
    }),
    setErrorMessage: (state, action: PayloadAction<string>) => ({
      ...state, errorMessage: action.payload,
    }),
    clearErrorMessage: (state) => ({
      ...state, errorMessage: null,
    }),
    setErrorObject: (state, action: PayloadAction<TAPIError>) => ({
      ...state, errorObject: action.payload,
    }),
    clearErrorObject: (state) => ({
      ...state, errorObject: null,
    }),
    allPostsRequested: (state) => ({
      ...state, isAllPostsRequested: true,
    }),
    allPostsRequestSucceeded: (state) => ({
      ...state, isAllPostsRequested: false,
    }),
    allPostsRequestFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload,
    }),
    pendingPostsRequested: (state) => ({
      ...state, isPendingPostsRequested: true,
    }),
    pendingPostsRequestSucceeded: (state) => ({
      ...state, isPendingPostsRequested: false,
    }),
    pendingPostsRequestFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, errorObject: action.payload,
    }),
    userRegistrationRequested: (state) => ({
      ...state, isUserRegistering: true,
    }),
    userRegistrationSucceeded: (state) => ({
      ...state, isUserRegistering: false,
    }),
    userRegistrationFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload,
    }),
    userLoginRequested: (state) => ({
      ...state, isUserLoggingIn: true,
    }),
    userLoginSucceeded: (state) => ({
      ...state, isUserLoggingIn: false,
    }),
    userLoginFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserLoggingIn: false, errorObject: action.payload,
    }),
    userFetchRequested: (state) => ({
      ...state, isUserFetching: true,
    }),
    userFetchSucceeded: (state) => ({
      ...state, isUserFetching: false,
    }),
    userFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserFetching: false, errorObject: action.payload,
    }),
    userPatchRequested: (state) => ({
      ...state, isUserPatching: true,
    }),
    userPatchSucceeded: (state) => ({
      ...state, isUserPatching: false,
    }),
    userPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserPatching: false, errorObject: action.payload,
    }),
    usersFetchRequested: (state) => ({
      ...state, isUsersFetching: true,
    }),
    usersFetchSucceeded: (state) => ({
      ...state, isUsersFetching: false,
    }),
    usersFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUsersFetching: false, errorObject: action.payload,
    }),
    userRolesPatchRequested: (state) => ({
      ...state, isUserRolesPatching: true,
    }),
    userRolesPatchSucceeded: (state) => ({
      ...state, isUserRolesPatching: false,
    }),
    userRolesPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRolesPatching: false, errorObject: action.payload,
    }),
    publicFeedRequested: (state) => ({
      ...state, isPublicFeedFetching: true,
    }),
    publicFeedSucceeded: (state) => ({
      ...state, isPublicFeedFetching: false,
    }),
    publicFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPublicFeedFetching: false, errorObject: action.payload,
    }),
    articleFetchRequested: (state) => ({
      ...state, isArticleFetching: true, isArticleNotFound: false,
    }),
    articleFetchSucceeded: (state) => ({
      ...state, isArticleFetching: false, isArticleNotFound: false,
    }),
    articleFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleFetching: false, errorObject: action.payload,
    }),
    setArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: true,
    }),
    clearArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: false,
    }),
    privateFeedRequested: (state) => ({
      ...state, isPrivateFeedFetching: true,
    }),
    privateFeedSucceeded: (state) => ({
      ...state, isPrivateFeedFetching: false,
    }),
    privateFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPrivateFeedFetching: false, errorObject: action.payload,
    }),
    articlePostRequested: (state) => ({
      ...state, isArticlePosting: true, sArticlePostingSucceeded: false,
    }),
    articlePostSucceeded: (state) => ({
      ...state, isArticlePosting: false, isArticlePostingSucceeded: true,
    }),
    articlePostClear: (state) => ({
      ...state,
      isArticlePosting: false,
      isArticlePostingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePosting: false, errorObject: action.payload,
    }),
    articleDeleteRequested: (state) => ({
      ...state, isArticleDeleting: true, isArticleRemoved: false,
    }),
    articleDeleteSucceeded: (state) => ({
      ...state, isArticleDeleting: false, isArticleRemoved: true,
    }),
    articleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleDeleting: false, errorObject: action.payload,
    }),
    articleDeleteClear: (state) => ({
      ...state,
      isArticleDeleting: false,
      isArticleRemoved: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchRequested: (state) => ({
      ...state, isArticlePatching: true,
    }),
    articlePatchSucceeded: (state) => ({
      ...state, isArticlePatching: false, isArticlePatchingSucceeded: true,
    }),
    articlePatchClear: (state) => ({
      ...state,
      isArticlePatching: false,
      isArticlePatchingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePatching: false, errorObject: action.payload,
    }),
    articlePublishRequested: (state) => ({
      ...state, isArticlePublishing: true,
    }),
    articlePublishSucceeded: (state) => ({
      ...state, isArticlePublishing: false, isArticlePublishingSucceeded: true,
    }),
    articlePublishFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePublishing: false, errorObject: action.payload,
    }),
    articleDeclineRequested: (state) => ({
      ...state, isArticleDeclining: true,
    }),
    articleDeclineSucceeded: (state) => ({
      ...state, isArticleDeclining: false, isArticleDecliningSucceeded: true,
    }),
    articleDeclineFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleDeclining: false, errorObject: action.payload,
    }),
    articleRemovePublishRequested: (state) => ({
      ...state, isArticleRemovePublishing: true,
    }),
    articleRemovePublishSucceeded: (state) => ({
      ...state, isArticleRemovePublishing: false, isArticleRemovePublishingSucceeded: true,
    }),
    articleRemovePublishFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleRemovePublishing: false, errorObject: action.payload,
    }),
    likeArticlePostRequested: (state) => ({
      ...state, isLikeArticlePosting: true,
    }),
    likeArticlePostSucceeded: (state) => ({
      ...state, isLikeArticlePosting: false,
    }),
    likeArticlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticlePosting: false, errorObject: action.payload,
    }),
    likeArticleDeleteRequested: (state) => ({
      ...state, isLikeArticleDeleting: true,
    }),
    likeArticleDeleteSucceeded: (state) => ({
      ...state, isLikeArticleDeleting: false,
    }),
    likeArticleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticleDeleting: false, errorObject: action.payload,
    }),
    tagsFetchRequested: (state) => ({
      ...state, isTagsFetching: true,
    }),
    tagsFetchSucceeded: (state) => ({
      ...state, isTagsFetching: false,
    }),
    tagsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagsFetching: false, errorObject: action.payload,
    }),
    commentsFetchRequested: (state) => ({
      ...state, isCommentsFetching: true,
    }),
    commentsFetchSucceeded: (state) => ({
      ...state, isCommentsFetching: false,
    }),
    commentsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentsFetching: false, errorObject: action.payload,
    }),
    commentsAdminFetchRequested: (state) => ({
      ...state, isCommentsAdminFetching: true,
    }),
    commentsAdminFetchSucceeded: (state) => ({
      ...state, isCommentsAdminFetching: false,
    }),
    commentsAdminFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentsAdminFetching: false, errorObject: action.payload,
    }),
    commentPostRequested: (state) => ({
      ...state, isCommentPosting: true,
    }),
    commentPostSucceeded: (state) => ({
      ...state, isCommentPosting: false,
    }),
    commentPostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentPosting: false, errorObject: action.payload,
    }),
    commentDeleteRequested: (state) => ({
      ...state, isCommentDeleting: true,
    }),
    commentDeleteSucceeded: (state) => ({
      ...state, isCommentDeleting: false,
    }),
    commentDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentDeleting: false, errorObject: action.payload,
    }),
    profileFetchRequested: (state) => ({
      ...state, isProfileFetching: true, isProfileNotFound: false,
    }),
    profileFetchSucceeded: (state) => ({
      ...state, isProfileFetching: false, isProfileNotFound: false,
    }),
    profileFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isProfileFetching: false, errorObject: action.payload,
    }),
    setProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: true,
    }),
    clearProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: false,
    }),
    followProfilePostRequested: (state) => ({
      ...state, isFollowProfilePosting: true,
    }),
    followProfilePostSucceeded: (state) => ({
      ...state, isFollowProfilePosting: false,
    }),
    followProfilePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfilePosting: false, errorObject: action.payload,
    }),
    followProfileDeleteRequested: (state) => ({
      ...state, isFollowProfileDeleting: true,
    }),
    followProfileDeleteSucceeded: (state) => ({
      ...state, isFollowProfileDeleting: false,
    }),
    followProfileDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfileDeleting: false, errorObject: action.payload,
    }),
    settingsPatchRequested: (state) => ({
      ...state, isSettingsPatching: true, isSettingsUpdateSucceeded: false,
    }),
    settingsPatchSucceeded: (state) => ({
      ...state, isSettingsPatching: false, isSettingsUpdateSucceeded: true,
    }),
    settingsResetUpdateSucceeded: (state) => ({
      ...state, isSettingsUpdateSucceeded: false, errorObject: null,
    }),
    settingsPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state,
      isSettingsPatching: false,
      isSettingsUpdateSucceeded: false,
      errorObject: action.payload,
    }),
    subscribeTagRequested: (state) => ({
      ...state, isTagSubscribed: true,
    }),
    subscribeTagSucceeded: (state) => ({
      ...state, isTagSubscribed: false,
    }),
    subscribeTagFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagSubscribed: false, errorObject: action.payload,
    }),
    unsubscribeTagRequested: (state) => ({
      ...state, isUnsubscribeTagDeleting: true,
    }),
    unsubscribeTagSucceeded: (state) => ({
      ...state, isUnsubscribeTagDeleting: false,
    }),
    unsubscribeTagFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUnsubscribeTagDeleting: false, errorObject: action.payload,
    }),
    subscribeTagsFetchRequested: (state) => ({
      ...state, isSubscribeTagsFetching: true,
    }),
    subscribeTagsFetchSucceeded: (state) => ({
      ...state, isSubscribeTagsFetching: false,
    }),
    subscribeTagsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isSubscribeTagsFetching: false, errorObject: action.payload,
    }),
    inviteCodeFetchRequested: (state) => ({
      ...state, isInviteCodeFetching: true,
    }),
    inviteCodeFetchSucceeded: (state) => ({
      ...state, isinviteCodeFetching: false,
    }),
    inviteCodeFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isInviteCodeFetching: false, errorObject: action.payload,
    }),
  },
});

const apiReducer = apiSlice.reducer;
export const {
  setSuccessMessage,
  setErrorMessage,
  clearSuccessMessage,
  clearErrorMessage,
  clearErrorObject,
  setErrorObject,
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  userLoginRequested,
  userLoginSucceeded,
  userLoginFailed,
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  userPatchRequested,
  userPatchSucceeded,
  userPatchFailed,
  usersFetchRequested,
  usersFetchSucceeded,
  usersFetchFailed,
  userRolesPatchRequested,
  userRolesPatchSucceeded,
  userRolesPatchFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  publicFeedFailed,
  articleFetchRequested,
  articleFetchSucceeded,
  articleFetchFailed,
  privateFeedRequested,
  privateFeedSucceeded,
  privateFeedFailed,
  articlePostRequested,
  articlePostSucceeded,
  articlePostFailed,
  articleDeleteRequested,
  articleDeleteSucceeded,
  articleDeleteFailed,
  articlePatchRequested,
  articlePatchSucceeded,
  articlePatchFailed,
  articlePublishRequested,
  articlePublishSucceeded,
  articlePublishFailed,
  articleDeclineRequested,
  articleDeclineSucceeded,
  articleDeclineFailed,
  articleRemovePublishRequested,
  articleRemovePublishSucceeded,
  articleRemovePublishFailed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  likeArticlePostFailed,
  likeArticleDeleteRequested,
  likeArticleDeleteSucceeded,
  likeArticleDeleteFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
  tagsFetchFailed,
  commentsFetchRequested,
  commentsFetchSucceeded,
  commentsFetchFailed,
  commentsAdminFetchRequested,
  commentsAdminFetchSucceeded,
  commentsAdminFetchFailed,
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  commentDeleteRequested,
  commentDeleteSucceeded,
  commentDeleteFailed,
  profileFetchRequested,
  profileFetchSucceeded,
  profileFetchFailed,
  followProfilePostRequested,
  followProfilePostSucceeded,
  followProfilePostFailed,
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  settingsResetUpdateSucceeded,
  allPostsRequested,
  allPostsRequestSucceeded,
  allPostsRequestFailed,
  pendingPostsRequested,
  pendingPostsRequestSucceeded,
  pendingPostsRequestFailed,
  setArticleFetchNotFound,
  clearArticleFetchNotFound,
  clearProfileFetchNotFound,
  setProfileFetchNotFound,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
  subscribeTagRequested,
  subscribeTagSucceeded,
  subscribeTagFailed,
  unsubscribeTagRequested,
  unsubscribeTagSucceeded,
  unsubscribeTagFailed,
  subscribeTagsFetchRequested,
  subscribeTagsFetchSucceeded,
  subscribeTagsFetchFailed,
  inviteCodeFetchRequested,
  inviteCodeFetchSucceeded,
  inviteCodeFetchFailed,
} = apiSlice.actions;
export default apiReducer;
