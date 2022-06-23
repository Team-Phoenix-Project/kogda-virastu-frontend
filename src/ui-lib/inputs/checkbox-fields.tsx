import React, {
  FC,
  ChangeEventHandler,
  useState,
  ChangeEvent,
} from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { CheckBoxIcon } from '../icons';

interface CheckBoxProps {
  name: string;
  checked: boolean;
  message: string,
  marginRight: number,
  onChange: ChangeEventHandler<HTMLInputElement>,
}

interface StyledCheckboxProps {
  checked: boolean;
  marginRight: number,
}

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled(CheckBoxIcon)``;

const checkedStyles = css`
  background-color: ${({ theme: { inputField: { checkBox } } }) => checkBox};
  &:hover {
    background-color: ${({ theme: { inputField: { checkBoxHover } } }) => checkBoxHover};
  }
  &:active {
    background-color: ${({ theme: { inputField: { checkBoxActive } } }) => checkBoxActive};
  }
`;

const uncheckedStyles = css`
  border: 2px solid ${({ theme: { inputField: { checkBox } } }) => checkBox};
  &:hover {
    border-color: ${({ theme: { inputField: { checkBoxHover } } }) => checkBoxHover};
  }
  &:active {
    border-color: ${({ theme: { inputField: { checkBoxActive } } }) => checkBoxActive};
  }
`;

/* eslint-disable ternary/no-unreachable */
const StyledCheckbox = styled.span<StyledCheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: ${({ marginRight }) => marginRight}px;
  border-radius: 6px;
  box-sizing: border-box;

  ${({ checked }) => (checked ? checkedStyles : uncheckedStyles)};
  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;
/* eslint-enable ternary/no-unreachable */

const CheckBox: FC<CheckBoxProps> = ({
  name,
  checked,
  message,
  marginRight,
  onChange,
}) => {
  const [inputChecked, setInputChecked] = useState(checked);
  const chechInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputChecked(evt.currentTarget.checked);
    onChange(evt);
  };

  return (
    <Label>
      <HiddenCheckbox name={name} checked={inputChecked} onChange={chechInput} />
      <StyledCheckbox checked={inputChecked} marginRight={marginRight}>
        <Icon color='transparent' />
      </StyledCheckbox>
      <FormattedMessage id={message} />
    </Label>
  );
};

export default CheckBox;
