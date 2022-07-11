import styled from 'styled-components';
import React, {
  FC, ChangeEventHandler, MouseEventHandler, FocusEventHandler,
} from 'react';
import { TextFieldStyle, LabelStyle, ErrorText } from './text-fields-styles';
import { TInputFieldType } from '../../types/styles.types';

const InputStyle = styled.input<{ error: boolean }>`
  box-sizing: border-box;
  padding-right: 20px;
  ${TextFieldStyle}
`;

const ContainerInput = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width:768px) {
    font-size: 16px;
  }
`;

const ContainerIcon = styled.div`
  position: absolute;
  top:32px;
  right:16px;
  cursor: pointer;
`;

interface IInputInterface {
  type: TInputFieldType;
  placeholder: string;
  value: string;
  name: string;
  error: boolean;
  minLength?: number;
  maxLength?: number;
  icon?: React.ReactNode;
  errorText: string;
  disabled: boolean;
  required?: boolean;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onIconClick?: MouseEventHandler;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const InputField :FC<IInputInterface> = ({
  type, placeholder, value, name, error = false, icon = null, errorText = '', onChange, onIconClick, onBlur, onFocus,
  disabled = false, labelText = '', minLength, maxLength, required,
}: IInputInterface) => (
  <ContainerInput>
    <LabelStyle>
      {labelText}
      <InputStyle
        disabled={disabled}
        error={error}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur} />
    </LabelStyle>
    <ContainerIcon onClick={onIconClick}>
      {icon}
    </ContainerIcon>
    {error && <ErrorText errorText={errorText} />}
  </ContainerInput>
);

InputField.defaultProps = {
  icon: undefined,
  onIconClick: undefined,
  minLength: undefined,
  maxLength: undefined,
  onBlur: undefined,
  onFocus: undefined,
  required: undefined,
};

export default InputField;
