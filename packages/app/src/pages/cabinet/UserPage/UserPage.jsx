import React from 'react';
import Page from '@lskjs/page';
import Link from '@lskjs/link';
import Button from '@lskjs/button';
import T from '@lskjs/t';
import { H1, P } from '@lskjs/typo';

export default ({ item, canEdit }) => (
  <Page layout={Page.CabinetLayout}>
    <Page.Header />
    <Page.Body>
      <H1>{item.name}</H1>
      <P>{item.info.description}</P>
      avatar={item.avatar}
      <img src={item.avatar} />
      {canEdit && (
        <Button componentClass={Link} href={`/cabinet/users/${item._id}/edit`}>
          <T name="buttons.edit" />
        </Button>
      )}
      {/* - Раскрытая карточка - чуть больше инфы - инста - расстояние - спотифай - город - работа - универ - все теже
      действия - share профиля (ссылка живет в течении суток) - назад */}
    </Page.Body>
  </Page>
);
