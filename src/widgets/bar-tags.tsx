import React, { FC, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from '../services/hooks';
import Tag from './tag';
import { setSubscribeTags } from '../store';
import subscribeTagThunk from '../thunks/subscribe-tag-thunk';
import unsubscribeTagThunk from '../thunks/unsubscribe-tag-thunk';

type TBarTags = {
  tagList: string[],
  setActiveState: React.Dispatch<React.SetStateAction<boolean>>,
  setTagState: React.Dispatch<React.SetStateAction<string>>;
};

type TLists = {
  isHasImage?: boolean,
  rowReverse?: boolean;
};
type TMessageSubscriptionTag = {
  active: boolean;
};
interface IHandleClickTag {
  (e: MouseEvent<HTMLButtonElement>, tag: string, isActive: boolean | undefined) : void | undefined;
}
export const MessageSubscriptionTag = styled.div<TMessageSubscriptionTag>`
    opacity: ${({ active }) => !active && '0'};
    transition: opacity 2s cubic-bezier(.21, .81, .01, .79);
    display: flex;
    position: absolute;
    bottom: 0px;
    box-sizing:border-box;
    padding: 5px;
    width: 100%;
`;

export const MessageText = styled.p`
    display: flex;
    text-align: center;
    padding:5px 10px;
    margin: 0 auto;
    border-radius: 15px;
    background-color: black;
    color: white;
    max-width: 100%;
    width: -webkit-fit-content;
    box-sizing:border-box;
`;
const Lists = styled.ul<TLists>`
    display: flex;
    position: relative;
    box-sizing:border-box;
    flex-wrap: wrap;
   // flex-direction: ${({ rowReverse }) => rowReverse && 'row-reverse'};
    gap: 4px 24px;
    //width:526px;
    white-space: pre-line;
    padding:0;
    @media screen and (max-width:768px) {
        max-width:453px;
        /* ${({ isHasImage }) => isHasImage && 'margin-left: -60px'} */
     }
     @media screen and (max-width:600px) {
        max-width:352px;
        margin:0;
        flex-direction: row;
     }
`;

Lists.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

const List = styled.li`
    list-style-type: none;
`;

const BarTags: FC<TBarTags & TLists> = ({
  setActiveState, setTagState, tagList, isHasImage = false, rowReverse = false,
}) => {
  const { tagsFollow } = useSelector((state) => state.view);
  const dispatch = useDispatch();
  const handleClickTag: IHandleClickTag = (e, tag, isActive) => {
    e.preventDefault();
    setTagState(tag);
    if (!isActive) {
      setActiveState(true);
      setTimeout(setActiveState, 2000, false);
      dispatch(subscribeTagThunk(tag));
      if (tagsFollow) {
        dispatch(setSubscribeTags([...tagsFollow, tag]));
      } else {
        dispatch(setSubscribeTags([tag]));
      }
    } else {
      dispatch(unsubscribeTagThunk(tag));
      dispatch(setSubscribeTags(tagsFollow!.filter((el) => el !== tag)));
    }
  };
  return (
    <Lists isHasImage={isHasImage} rowReverse={rowReverse}>
      {tagList.map((tag) => (
        <List key={nanoid(10)}>
          <Tag
            tag={tag}
            pointer
            isShowIcon={false}
            isActive={!!tagsFollow?.includes(tag)}
            handleClick={handleClickTag} />
        </List>
      ))}
    </Lists>
  );
};

BarTags.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

export default BarTags;
