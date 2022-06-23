import React, {
  FC, ChangeEventHandler, FormEventHandler, FocusEventHandler, useEffect, useState, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from '../../services/hooks';
import { TagSetForm } from '../tag';
import { LabelStyle } from '../../ui-lib/inputs/text-fields-styles';
import unsubscribeTagThunk from '../../thunks/unsubscribe-tag-thunk';
import Preloader from '../preloader';
import getSubscribeTagsThunk from '../../thunks/get-subscribe-tags-thunk';

import {
  setUsernameProfile,
  setEmailProfile,
  setBioProfile,
  setImageProfile,
  setNicknameProfile,
  setFormProfile,
  setPasswordProfile,
  setSelectedTags,
  setSubscribeTags,
  setConfirmPasswordProfile,
} from '../../store';

import { patchCurrentUserThunk } from '../../thunks';

import {
  ButtonContainer,
  ButtonContainerFlexStart,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  FieldEmail,
  FieldLogin,
  FieldNick,
  FieldPassword,
  ConfirmPassword,
  FieldProfileImage,
  UpdateProfileButton,
  FieldAboutUser,
} from '../../ui-lib';
import { GenerateInviteCode } from '../../ui-lib/buttons';
import getInviteCodeThunk from '../../thunks/get-invite-code-thunk';

const TagListForm = styled.div`
  max-width: 360px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  padding-top: 10px;
  padding-bottom: 30px;
`;
const ContainerTags = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (max-width:768px) {
    font-size: 16px;
  }
`;
const CopyButton = styled.button`
  visibility: hidden;
  margin-top: 5px;
  padding: 10px;
  outline: none;
  border: none;
  color: #008AFF;
  background-color: #fff;
    &:hover {
      background-color: #eee;
    }
`;
const CopySuccess = styled.span`
  margin: 10px 0; 
  align-self: center;
  color: green;
`;
const Invite = styled.span`
  margin-left: 10px;
  align-self: center;
`;
const ContainerCopyLink = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (max-width:768px) {
    font-size: 16px;
  }
`;

const SettingsForm: FC = () => {
  const {
    bio, email, image, username, password, nickname, confirmPassword, invitionCode,
  } = useSelector((state) => state.forms.profile);

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getSubscribeTagsThunk());
    dispatch(setFormProfile({
      username: profile.username || '',
      email: profile.email || '',
      nickname: profile.nickname || '',
      bio: profile.bio || '',
      image: profile.image || '',
    }));
  }, [dispatch, profile]);

  const { tagsFollow } = useSelector((state) => state.view);
  const { selectedTags } = useSelector((state) => state.view);
  const handleClick = (ev:React.MouseEvent, tag: string) => {
    ev.preventDefault();
    if (selectedTags) {
      dispatch(setSelectedTags([...selectedTags, tag]));
    } else {
      dispatch(setSelectedTags([tag]));
    }
  };
  const { isSettingsPatching, isSettingsUpdateSucceeded } = useSelector((state) => state.api);

  const passwordConfirmation = password && confirmPassword ? password !== confirmPassword : false;
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSettingsUpdateSucceeded) {
      navigate('/');
    }
  //  return () => { dispatch(settingsResetUpdateSucceeded()); };
  }, [dispatch, isSettingsUpdateSucceeded, navigate]);

  const [copied, setCopied] = useState<boolean>(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (!passwordConfirmation) {
      const files = fileInput.current?.files;
      const file = files && files.length ? files[0] : null;
      dispatch(patchCurrentUserThunk(file));
    }
  };

  const changeImage : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setImageProfile(evt.target.value));
  };

  const onFocusImage: FocusEventHandler<HTMLInputElement> = () => {
    if (fileInput.current) {
      setSelectedFileName('');
      fileInput.current.value = '';
    }
  };

  const changeUsername : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setUsernameProfile(evt.target.value));
  };

  const changeBioProfile : ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setBioProfile(evt.target.value));
  };

  const changeEmail : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setEmailProfile(evt.target.value));
  };
  const changeNickname : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setNicknameProfile(evt.target.value));
  };
  const changePassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setPasswordProfile(evt.target.value));
  };
  const onConfirmPassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setConfirmPasswordProfile(evt.target.value));
  };
  const deleteTag = (e: React.MouseEvent, tag: string) => {
    dispatch(unsubscribeTagThunk(tag));
    dispatch(setSubscribeTags(tagsFollow!.filter((el) => el !== tag)));
  };

  const showCode = invitionCode as unknown as boolean;

  const GenerateInviteCodeHandler = () => {
    dispatch(getInviteCodeThunk());
  };

  function copyToClipboard(link: string | null) {
    navigator.clipboard.writeText(link ?? '')
      .then(() => {
        setTimeout(() => setCopied(false), 2000);
        return setCopied(true);
      })
      .catch((err) => console.log(err));
  }
  const link = `${window.location.origin}/registration?=${invitionCode ?? ''}`;

  const onSelectFile = () => {
    const files = fileInput.current?.files;
    const fileName = (files && files.length && files[0].name) || '';
    setSelectedFileName(`Выбран файл: ${fileName}`);
  };
  if (tagsFollow) {
    return (
      <FormContainer>
        <FormTitle>
          <FormattedMessage id='usersettings' />
        </FormTitle>
        <Form onSubmit={submitForm}>
          <InputFieldset rowGap={16}>
            <FieldProfileImage
              value={selectedFileName || image || ''}
              onChange={changeImage}
              onFocus={onFocusImage}
              fileInputRef={fileInput}
              onSelectFile={onSelectFile} />
            <FieldLogin value={username ?? ''} onChange={changeUsername} />
            <FieldNick value={nickname ?? ''} onChange={changeNickname} />
            <FieldAboutUser
              onChange={changeBioProfile}
              value={bio ?? ''}
              minHeight={theme.text18.height * 5} />
            <FieldEmail value={email ?? ''} onChange={changeEmail} />
            <FieldPassword value={password ?? ''} onChange={changePassword} />
            <ConfirmPassword
              value={confirmPassword ?? ''}
              error={passwordConfirmation}
              onChange={onConfirmPassword}
              required={password as unknown as boolean} />
          </InputFieldset>
          <ButtonContainerFlexStart>
            <GenerateInviteCode onClick={GenerateInviteCodeHandler} />
            {showCode ? <Invite>{invitionCode}</Invite> : null}
          </ButtonContainerFlexStart>
          <ContainerCopyLink>
            <CopyButton
              type='button'
              style={{ visibility: invitionCode as unknown as boolean ? 'visible' : 'hidden' }}
              onClick={() => copyToClipboard(link)}>
              Скопировать ссылку-приглашение
            </CopyButton>
            <CopySuccess style={{ visibility: copied ? 'visible' : 'hidden' }}>Ссылка скопирована в буфер обмена!</CopySuccess>
          </ContainerCopyLink>
          <ContainerTags>
            <LabelStyle>
              <FormattedMessage id='tagsInForm' />
            </LabelStyle>
            <TagListForm>
              {
                tagsFollow.length > 0 ? tagsFollow.map((tag) => (
                  <TagSetForm
                    key={tag}
                    tag={tag}
                    deleteTag={(e) => deleteTag(e, tag)} />
                )) : <FormattedMessage id='messageAboutMissingTags' />
              }
            </TagListForm>
          </ContainerTags>
          <ButtonContainer>
            <UpdateProfileButton disabled={isSettingsPatching} />
          </ButtonContainer>
        </Form>
      </FormContainer>
    );
  }
  return (
    <Preloader />
    // <div>.......Loading Tags SettingsForm...</div>
  );
};

export default SettingsForm;
