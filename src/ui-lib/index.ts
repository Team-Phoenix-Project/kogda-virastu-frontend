import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import {
  EditIcon,
  CrossIcon,
  DeleteIcon,
  AvatarIcon,
  PlusIcon,
  MinusIcon,
  LoginIcon,
  HomeIcon,
  AsterixIcon,
  CheckIcon,
  LikeIcon,
  LogoutIcon,
  NoLikeIcon,
  PaperClipIcon,
  EyeIcon,
  EyeNoIcon,
  ArrowLeft,
  ArrowRight,
  PreloaderBox,
} from './icons';

import {
  EditPostButton,
  DeletePostButton,
  OpenMenuButton,
  FollowButton,
  UnfollowButton,
  LoginButton,
  RegisterButton,
  UpdateProfileButton,
  PostCommentButton,
  PublishPostButton,
  SavePostButton,
  ConfirmDeleteButton,
  ConfirmDeleteButtonModal,
  MenuNewPostButton,
  MenuSettingsButton,
  MenuAdministartionButton,
  MenuLogoutButton,
} from './buttons';

import {
  FieldUrl,
  FieldLogin,
  FieldEmail,
  FieldPassword,
  ConfirmPassword,
  FieldNameArticle,
  FieldDescriptionArticle,
  FieldTags,
  FieldNick,
  InvitionCode,
  FieldProfileImage,
} from './inputs/input-fields';

import {
  FieldTextComment,
  FieldAboutArticle,
  FieldAboutUser,
  FieldTextArticle,
} from './inputs/textarea-fields';

import CheckBox from './inputs/checkbox-fields'

import {
  HeaderOneText,
  HeaderTwoText,
  HeaderThreeText,
  HeaderFourText,
  HeaderFiveText,
  RegularText,
} from './text-elements';

import Divider from './divider';

const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

export default GlobalStyles;

export {
  PlusIcon,
  HomeIcon,
  LoginIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
  AvatarIcon,
  AsterixIcon,
  CheckIcon,
  LikeIcon,
  NoLikeIcon,
  LogoutIcon,
  PaperClipIcon,
  CrossIcon,
  EyeIcon,
  EyeNoIcon,
  EditPostButton,
  DeletePostButton,
  OpenMenuButton,
  FollowButton,
  UnfollowButton,
  LoginButton,
  RegisterButton,
  UpdateProfileButton,
  PostCommentButton,
  PublishPostButton,
  SavePostButton,
  ConfirmDeleteButton,
  ConfirmDeleteButtonModal,
  Divider,
  FieldUrl,
  FieldLogin,
  FieldEmail,
  FieldPassword,
  ConfirmPassword,
  FieldNick,
  InvitionCode,
  FieldNameArticle,
  FieldDescriptionArticle,
  FieldTags,
  FieldProfileImage,
  FieldTextArticle,
  FieldAboutUser,
  FieldAboutArticle,
  CheckBox,
  HeaderOneText,
  HeaderTwoText,
  HeaderThreeText,
  HeaderFourText,
  HeaderFiveText,
  RegularText,
  MenuNewPostButton,
  MenuSettingsButton,
  MenuAdministartionButton,
  MenuLogoutButton,
  FieldTextComment,
  ArrowLeft,
  ArrowRight,
  PreloaderBox,
};
