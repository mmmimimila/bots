import React from 'react';
import Page from '@lskjs/page';
// import MessagesList from './components/MessagesList';
import Message from './components/Message';

const avatar = 'https://randomuser.me/api/portraits/men/19.jpg';

const MessageGroup = ({ children }) => <div>{children}</div>;

const groupItems = (items, { userId } = {}) => {
  const groups = items.map((item) => ({ user: item.user, items: [item] }));

  return groups.map((group) => {
    const showTitle = group.user && group.user._id !== userId;
    const showAvatar = group.user && group.user._id !== userId;
    const isRightDir = group.user && group.user._id === userId;
    return {
      ...group,
      showTitle,
      showAvatar,
      isRightDir,
    };
  });
};

export const BotsChatPage = ({ listStore, userId }) => {
  const initItems = listStore.items;
  const groups = groupItems(initItems, { userId });

  return (
    <Page layout={Page.AdminLayout}>
      <Page.Header />
      <Page.Body>
        <div>
          {groups.map(({ items, ...group }) => (
            <MessageGroup {...group}>
              {items.map((item) => (
                <Message
                  // {...item.content}
                  time={item.createdAt}
                  text={item.text || item.caption}
                  image={item.photo && `/api/bots/messages/photo/${item.photo[0].file_id}`}
                  authorName={item.from && [item.from.first_name, item.from.last_name].join(' ')}
                  avatar={avatar}
                  showTitle={item.from.id !== userId}
                  showAvatar={item.from.id !== userId}
                  isRightDir={item.from.id === userId}
                />
              ))}
            </MessageGroup>
          ))}
        </div>
      </Page.Body>
    </Page>
  );
};

export default BotsChatPage;
