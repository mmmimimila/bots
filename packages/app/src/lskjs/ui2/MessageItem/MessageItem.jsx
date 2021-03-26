import React from 'react';
import Image from '@lskjs/image';
import * as Styles from './MessageItem.styles';

// TODO: функция с ...

const MessageItem = ({ item }) => (
  <Styles.MessageWrapper>
    {item.photo && <Image height={32} src={`/api/bots/messages/photo/${item.photo[0].file_id}`} />}
    <Styles.TextWrapper>{(item.text || item.caption || '').substr(0, 40)}</Styles.TextWrapper>
  </Styles.MessageWrapper>
);

export default MessageItem;
