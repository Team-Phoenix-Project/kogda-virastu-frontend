import React, { FC, MouseEventHandler, MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { CrossIcon } from '../ui-lib';
import { getPropOnCondition } from '../services/helpers';

interface ITagProps extends ITagButtonProps {
  tag: string,
  handleClick?: (e: MouseEvent<HTMLButtonElement>, tag: string, isActive?:boolean) => void,
  deactivateTag?: MouseEventHandler<SVGSVGElement>,
}
interface ITagSetFormProps {
  tag: string,
  deleteTag: MouseEventHandler<SVGSVGElement>,
}
interface ITagButtonProps {
  isActive: boolean;
  pointer?: boolean;
  isShowIcon?: boolean;
}
const Button = styled.button<ITagButtonProps>`

    padding: 0;
    border: none;
    font-family: ${({ theme }) => theme.text18Sans.family};
    font-weight: ${({ theme }) => theme.text18Sans.weight};
    font-size: ${({ theme }) => theme.text18Sans.size}px;
    line-height: ${({ theme }) => theme.text18Sans.height}px;
    cursor: ${({ pointer }) => getPropOnCondition(pointer, 'default', 'pointer')};
    display: flex;
    align-items: center;
    color: ${({ isActive, theme }) => (isActive ? theme.button.red.default : theme.secondaryText)};
    background-color: transparent;

    :hover {
      cursor: pointer;
    }

    :active {
      outline: none;
    }
  `;

const Tag: FC<ITagProps> = ({
  tag, handleClick = () => {}, isActive = true, deactivateTag, pointer, isShowIcon,
}) => {
  const theme = useTheme();
  return (
    <Button
      isActive={isActive}
      pointer={pointer}
      isShowIcon={isShowIcon}
      type='button'
      key={tag}
      onClick={(e) => handleClick(e, tag, isActive)}>
      #
      {tag}
      {' '}
      {isActive && isShowIcon && <CrossIcon color={theme.markedText} onClick={deactivateTag} />}
    </Button>
  );
};
export const TagSetForm: FC<ITagSetFormProps> = ({
  tag, deleteTag,
}) => {
  const theme = useTheme();
  return (
    <Button
      isActive={false}
      pointer={false}
      type='button'
      key={tag}>
      #
      {tag}
      {' '}
      <CrossIcon color={theme.secondaryText} onClick={deleteTag} />
    </Button>
  );
};

Tag.defaultProps = {
  handleClick: undefined,
  deactivateTag: undefined,
  pointer: false,
  isShowIcon: true,
};

export default Tag;
