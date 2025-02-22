import React, {
  FC, ChangeEventHandler, FormEventHandler, FocusEventHandler, useEffect, useState, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';

import {
  setTitle,
  setDescription,
  setBody,
  setTags,
  setImage,
  openConfirm,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
} from '../../store';
import {
  getArticleThunk,
  patchArticleThunk,
  postArticleThunk,
} from '../../thunks';
import {
  ButtonContainer,
  ButtonsWrapper,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  DeletePostButton,
  FieldNameArticle,
  FieldTags,
  FieldUrl,
  PublishPostButton,
  SavePostButton,
  FieldAboutArticle,
  FieldTextArticle,
} from '../../ui-lib';

const EditorForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    title, description, body, tags, link,
  } = useSelector((state) => state.forms.article) ?? {};
  const {
    isArticleFetching,
    isArticlePostingSucceeded,
    isArticlePatchingSucceeded,
    isArticleRemoved,
    isArticlePatching,
    isArticlePosting,
  } = useSelector((state) => state.api);
  const { slug } = useParams();
  const initialArticle = useSelector((state) => state.view.article);
  const [isPosted, setPostRequested] = useState(false);
  const [isRemoving, setRemoveState] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialArticle?.tagList) {
      dispatch(setTags(initialArticle.tagList.toString()));
    }
  }, [initialArticle, dispatch]);

  useEffect(
    () => {
      if (isPosted && isArticlePatchingSucceeded) {
        dispatch(articlePatchClear());
        navigate('/');
      } else if (isPosted && isArticlePostingSucceeded) {
        dispatch(articlePostClear());
        navigate('/');
      } else if (isArticleRemoved && isRemoving) {
        dispatch(articleDeleteClear());
        navigate('/');
      }
    },
    [
      dispatch,
      navigate,
      isPosted,
      isArticlePostingSucceeded,
      isArticlePatchingSucceeded,
      isArticleRemoved,
      isRemoving],
  );

  useEffect(() => {
    if (slug && !title) {
      dispatch(getArticleThunk(slug));
    }
  }, [slug, dispatch, title]);

  if (slug && isArticleFetching) {
    return <div>Подождите...</div>;
  }

  const onChangeTitle : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTitle(evt.target.value));
  };

  const onChangeDescription : ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setDescription(evt.target.value));
    // eslint-disable-next-line no-param-reassign
    evt.target.style.height = `${evt.target.scrollHeight + 2}px`;
  };

  const onChangeBody = (value: string) => {
    dispatch(setBody(value));
  };

  const onChangeTags : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTags(evt.target.value));
  };

  const onChangeImage : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setImage(evt.target.value));
  };

  const onFocusImage: FocusEventHandler<HTMLInputElement> = () => {
    if (fileInput.current) {
      setSelectedFileName('');
      fileInput.current.value = '';
    }
  };

  const onSelectFile = () => {
    const files = fileInput.current?.files;
    const fileName = (files && files.length && files[0].name) || '';
    setSelectedFileName(`Выбран файл: ${fileName}`);
  };

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setPostRequested(true);
    const files = fileInput.current?.files;
    const file = files && files.length ? files[0] : null;
    if (slug) {
      dispatch(patchArticleThunk(slug, file));
    } else {
      dispatch(postArticleThunk(file));
    }
  };

  const deleteArticle = () => {
    setRemoveState(true);
    dispatch(openConfirm());
  };
  const makeButtons = () => (
    slug ? (
      <ButtonsWrapper>
        <SavePostButton disabled={isArticleFetching} />
        <DeletePostButton onClick={deleteArticle} />
      </ButtonsWrapper>
    ) : (
      <PublishPostButton disabled={isArticleFetching || isArticlePatching || isArticlePosting} />
    )
  );

  const makeMessageId = () => {
    if (slug) {
      return 'editArticle';
    }
    return 'newArticle';
  };

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id={makeMessageId()} />
      </FormTitle>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={24}>
          <FieldNameArticle
            value={title === '' ? '' : title || initialArticle?.title || ''}
            onChange={onChangeTitle} />
          <FieldAboutArticle
            value={
              description === '' ? ''
                : description || initialArticle?.description || ''
            }
            onChange={onChangeDescription} />
          <FieldUrl
            value={link === '' ? '' : selectedFileName || link || initialArticle?.link || ''}
            onChange={onChangeImage}
            onFocus={onFocusImage}
            fileInputRef={fileInput}
            onSelectFile={onSelectFile} />
          <FieldTextArticle
            value={body === '' ? '' : body || initialArticle?.body || ''}
            onChange={onChangeBody}
            minHeight={300} />
          <FieldTags
            value={tags === '' ? '' : tags || ''}
            onChange={onChangeTags} />
        </InputFieldset>
        <ButtonContainer>
          {makeButtons()}
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default EditorForm;
