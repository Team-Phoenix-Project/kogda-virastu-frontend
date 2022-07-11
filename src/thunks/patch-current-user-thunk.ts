import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { patchCurrentUser, uploadImage } from '../services/api';
import {
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  setUser,
  resetFormProfile,
} from '../store';

import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIPatchUserData } from '../services/api.types';
import { API_ROOT } from '../constants/api.constants';

const patchCurrentUserThunk: AppThunk = (file: File) => async (dispatch, getState) => {
  dispatch(settingsPatchRequested());
  const profile = getState().forms.profile ?? {};
  // Type Guards
  const userData: TAPIPatchUserData = {
    username: profile.username || '',
    email: profile.email || '',
    bio: profile.bio || '',
    image: profile.image || '',
    nickname: profile.nickname || '',
  };

  if (profile.password) {
    userData.password = profile.password;
  }
  try {
    if (file) {
      const { data: { url } } = await uploadImage(file);
      const {
        data: {
          user: {
            username, email, bio, image, nickname,
          },
        },
      } = await patchCurrentUser({ ...userData, image: `${API_ROOT}${url}` });
      batch(() => {
        dispatch(setUser({
          username, email, bio, image, nickname,
        }));
        dispatch(resetFormProfile());
        dispatch(settingsPatchSucceeded());
      });
    } else {
      const {
        data: {
          user: {
            username, email, bio, image, nickname,
          },
        },
      } = await patchCurrentUser(userData);
      batch(() => {
        dispatch(setUser({
          username, email, bio, image, nickname,
        }));
        dispatch(resetFormProfile());
        dispatch(settingsPatchSucceeded());
      });
    }
  } catch (error) {
    dispatch(settingsPatchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchCurrentUserThunk;
