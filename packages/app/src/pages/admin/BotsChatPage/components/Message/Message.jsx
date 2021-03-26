import React from 'react';
import Image from '@lskjs/image';
// import Moment from 'react-moment';
// import 'moment-timezone';
import * as Styled from './Message.styles';

// eslint-disable-next-line react/prop-types
export default ({ image, authorName, time, text, isRightDir = false, showTitle, showAvatar, avatar }) => (
  // <Styled.Message isRightDir={isRightDir}>
  <Styled.Wrapper isRightDir={isRightDir}>
    {showAvatar && (
      <Styled.AvatarWrapper showTitle={showTitle}>
        <Styled.Avatar src={avatar} alt={authorName} />
      </Styled.AvatarWrapper>
    )}
    <Styled.Message>
      {showTitle && <Styled.Title>{authorName}</Styled.Title>}
      <Styled.ContentWrapper>
        <Styled.Text>
          {image && <Image widht={200} src={image} />}
          {text}
        </Styled.Text>
        <Styled.Time>
          {time}
          {/* <Moment format="HH:mm">{time}</Moment> */}
        </Styled.Time>
      </Styled.ContentWrapper>
    </Styled.Message>
  </Styled.Wrapper>
  // </Styled.Message>
);
