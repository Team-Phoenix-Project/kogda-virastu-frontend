import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { WYSIWYG_EDITOR } from '../../constants/api.constants';
import TextAreaField from './textarea-field-config';
import { LabelStyle } from './text-fields-styles';

interface IFieldInput {
  minHeight?: number,
  value: string,
  error?: boolean,
  placeholder?: string,
  errorText?: string,
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,
  onFocus?: FocusEventHandler<HTMLTextAreaElement>,
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  disabled?: boolean,
}

interface IMarkdownFieldInput {
  value: string,
  onChange: (value: string) => void,
  minHeight?: number | string,
}

const ContainerTextArea = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  @media screen and (max-width:768px) {
    font-size: 16px;
  }
`;

export const FieldAboutArticle: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <TextAreaField
      placeholder={placeholder}
      name='FieldAboutArticle'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.articleAbout as string}
      minHeight={minHeight}
      disabled={disabled}
      isHasBorder />
  );
};

FieldAboutArticle.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};

export const FieldAboutUser: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <TextAreaField
      placeholder={placeholder}
      name='FieldAboutArticle'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.aboutUser as string}
      minHeight={minHeight}
      disabled={disabled}
      isHasBorder />
  );
};

FieldAboutUser.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};

export const FieldTextArticle: FC<IMarkdownFieldInput> = ({
  value,
  onChange,
  minHeight,
}) => {
  const intl = useIntl();
  return (
    <ContainerTextArea>
      <LabelStyle>{intl.messages.articleText as string}</LabelStyle>
      <Editor
        apiKey={WYSIWYG_EDITOR}
        value={value}
        onEditorChange={onChange}
        init={{
          width: '100%',
          height: minHeight,
          menubar: false,
          resize: false,
          // eslint-disable-next-line camelcase
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
          ],
          plugins: `preview importcss searchreplace autoresize autolink autosave save directionality
          code visualblocks visualchars fullscreen image link media template codesample
          table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount
          help quickbars emoticons`,
          toolbar:
            'undo redo | bold italic underline | link blockquote codesample | numlist bullist | '
            + 'alignleft aligncenter alignright alignjustify | outdent indent | blocks | '
            + 'forecolor backcolor | charmap emoticons | insertfile image media | fullscreen  preview code',
          // eslint-disable-next-line camelcase
          toolbar_mode: 'sliding',
          // eslint-disable-next-line camelcase
          content_style: `
          @import url('https://fonts.googleapis.com/css?family=Alegreya');
          body { 
            padding: 0;
            margin: 8px 38px 8px 16px;
            font-family: 'Alegreya';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.25;
            color: #62626A;
          }

          p {
            margin: 0;
          }
        
          blockquote {
            border: 0;
            font-size: 24px;
            font-weight: 500;
            letter-spacing: .1em;
            margin: 2.5em auto;
            max-width: 540px;
            padding: 0 2rem;
            position: relative;
            text-align: center;
          }
          
          blockquote::before {
            color: #7B68EE;
            content: '“';
            font-size: 4em;
            left: 30%;
            pointer-events: none;
            position: absolute;
            top: -.75em;
          }
          
          blockquote::after {
            bottom: -1.2em;
            color: #7B68EE;
            content: '”';
            font-size: 4em;
            pointer-events: none;
            position: absolute;
            right: 30%;
          }

          @media screen and (min-device-width:768px) { 
            body { 
              margin-right: 16px;
              font-size: 18px;
              line-height: 1.33; 
            }
          }
          `,
        }} />
    </ContainerTextArea>
  );
};

FieldTextArticle.defaultProps = {
  minHeight: 0,
};

export const FieldTextComment: FC<IFieldInput> = ({
  value,
  onBlur = undefined,
  onFocus = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  minHeight = 0,
  disabled = false,
}) => (
  <TextAreaField
    placeholder={placeholder}
    name='FieldTextComment'
    labelText=''
    errorText={errorText}
    error={error}
    onBlur={onBlur}
    onFocus={onFocus}
    value={value}
    onChange={onChange}
    minHeight={minHeight}
    disabled={disabled}
    isHasBorder={false} />
);

FieldTextComment.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  error: false,
  errorText: '',
  minHeight: 0,
  disabled: false,
};
