import { useNavigate, useLocation } from 'react-router-dom';
import React, {
  ChangeEventHandler, FC, FormEventHandler, useEffect,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  changeUsernameRegister,
  changeUsernameErrMsg,
  changeUsernameErr,
  changeEmailRegister,
  changeEmailErrMsg,
  changeEmailErr,
  changePasswordRegister,
  changePasswordErrMsg,
  changePasswordErr,
  resetFormRegister,
  changeNicknameRegister,
  changeNicknameErrMsg,
  changeNicknameErr,
  changeConfirmPasswordRegister,
  changeInvitionCode,
  changeInvitionCodeErrMsg,
  changeInvitionCodeErr,
} from '../../store';
import { registerThunk } from '../../thunks';
import {
  ButtonContainer, Form, FormContainer, FormLoginLink, FormTitle, InputFieldset,
} from './forms-styles';
import {
  FieldEmail, FieldLogin, FieldNick, FieldPassword, InvitionCode, RegisterButton, ConfirmPassword,
} from '../../ui-lib';

const RegisterForm: FC = () => {
  const {
    username, usernameErrMsg, usernameErr, email, emailErrMsg,
    emailErr, password, passwordErrMsg, passwordErr, confirmPassword,
    nickname, nicknameErrMsg, nicknameErr, invitionCode, invitionCodeErrMsg, invitionCodeErr,
  } = useSelector((state) => state.forms.register);
  const { isUserRegistering } = useSelector((state) => state.api);
  const { isLoggedIn } = useSelector((state) => state.system);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const invite = location.search.slice(2);

  const passwordConfirmation = password && confirmPassword ? password !== confirmPassword : false;
  const formValid = (username ?? false) as boolean
  && (nickname ?? false) as boolean
  && (email ?? false) as boolean
  && (password ?? false) as boolean
  && (confirmPassword ?? false) as boolean
  && (invitionCode ?? false) as boolean
  && !usernameErr
  && !nicknameErr
  && !emailErr
  && !passwordErr
  && !passwordConfirmation
  && !invitionCodeErr;

  const onChangeEmail : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeEmailRegister(evt.target.value));
    dispatch(changeEmailErrMsg(evt.target.validationMessage));
    dispatch(changeEmailErr(!evt.target.validity.valid));
  };

  const onChangePassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changePasswordRegister(evt.target.value));
    dispatch(changePasswordErrMsg(evt.target.validationMessage));
    dispatch(changePasswordErr(!evt.target.validity.valid));
  };

  const onConfirmPassword : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeConfirmPasswordRegister(evt.target.value));
  };

  const onChangeInvitionCode : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeInvitionCode(evt.target.value));
    dispatch(changeInvitionCodeErrMsg(evt.target.validationMessage));
    dispatch(changeInvitionCodeErr(!evt.target.validity.valid));
  };

  const onChangeUsername : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeUsernameRegister(evt.target.value));
    dispatch(changeUsernameErrMsg(evt.target.validationMessage));
    dispatch(changeUsernameErr(!evt.target.validity.valid));
  };

  const onChangeNickname : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeNicknameRegister(evt.target.value));
    dispatch(changeNicknameErrMsg(evt.target.validationMessage));
    dispatch(changeNicknameErr(!evt.target.validity.valid));
  };

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(registerThunk());
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
    dispatch(resetFormRegister());
    if (invite !== '') {
      dispatch(changeInvitionCode(invite));
    }
  }, [dispatch, isLoggedIn, navigate, invite]);

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='register' />
      </FormTitle>
      <FormLoginLink to='/login'>
        <FormattedMessage id='userLogin' />
      </FormLoginLink>
      <Form onSubmit={submitForm} noValidate>
        <InputFieldset rowGap={16}>
          <FieldLogin value={username ?? ''} errorText={usernameErrMsg ?? ''} error={usernameErr ?? false} onChange={onChangeUsername} required />
          <FieldNick value={nickname ?? ''} errorText={nicknameErrMsg ?? ''} error={nicknameErr ?? false} onChange={onChangeNickname} required />
          <FieldEmail value={email ?? ''} errorText={emailErrMsg ?? ''} error={emailErr ?? false} onChange={onChangeEmail} required />
          <FieldPassword value={password ?? ''} errorText={passwordErrMsg ?? ''} error={passwordErr ?? false} onChange={onChangePassword} required />
          <ConfirmPassword value={confirmPassword ?? ''} error={passwordConfirmation} onChange={onConfirmPassword} />
          <InvitionCode value={invitionCode ?? ''} errorText={invitionCodeErrMsg ?? ''} error={invitionCodeErr ?? false} onChange={onChangeInvitionCode} required />
        </InputFieldset>
        <ButtonContainer>
          <RegisterButton disabled={isUserRegistering || !formValid} />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
