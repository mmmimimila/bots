import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@lskjs/ui/Avatar';
import filterProps from '@lskjs/utils/filterProps';
import { Title, AvatarWrapper, Block, TitleWrapper } from './UserItem.styles';

const UserItem = ({
  _id,
  id,
  avatar,
  image,
  normal,
  size,
  name,
  title,
  subtitle,
  user = {},
  componentClass: Tag,
  ...props
}) => (
  <Block componentClass={Tag} {...filterProps(Tag !== 'div' ? props : {}, Tag)}>
    <AvatarWrapper>
      <Avatar
        id={_id || id || user._id || user.id}
        src={avatar || image || user.avatar || user.image}
        name={user.title || user.name || title || name}
        size={size}
      />
    </AvatarWrapper>
    <TitleWrapper>
      {(title || name || user.title || user.name) && <Title>{title || name || user.title || user.name}</Title>}
      {(subtitle || user.subtitle) && <Title>{subtitle || user.subtitle}</Title>}
    </TitleWrapper>
  </Block>
);
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  componentClass: PropTypes.any,
  normal: PropTypes.bool,
  size: PropTypes.number,
};
UserItem.defaultProps = {
  componentClass: 'div',
  normal: false,
  size: 40,
};

export default UserItem;
