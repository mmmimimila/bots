import React from 'react';
import { observer } from '@lskjs/uapp/mobx-react';
import Link from '@lskjs/link';
import Button from '@lskjs/button';
import ButtonGroup from '@lskjs/button/ButtonGroup';
import DateInfo from '@lskjs/ui/DateInfo';
import sure from '@lskjs/modal/hoc/sure';
import EyeIcon from 'react-icons2/mdi/eye';
import PencilIcon from 'react-icons2/mdi/pencil';
import TrashIcon from 'react-icons2/mdi/trash';
import { ItemRow, ItemCol, createIndex } from '@lskjs/list/Table';
import ChipItem from '@lskjs/ui/ChipItem';

const SureModal = sure();

const AdminCompanyListItem = ({ item, onRemove, index = createIndex() }) => (
  <ItemRow>
    <ItemCol index={index()}>
      <ChipItem item={item} />
    </ItemCol>
    {/* <ItemCol index={index()} />
        <Horizontal verticalAlign="center">
            <Avatar id={get(item, 'user.id')} name={get(item, 'user.name')} src={get(item, 'user.avatar')} size={40} style={{ flexShrink: 0 }} />
            <span className={userTitle}>{get(item, 'user.name')}</span>
          </Horizontal>
        </ItemCol> */}
    <ItemCol index={index()}>
      <DateInfo value={item.createdAt} time />
    </ItemCol>
    <ItemCol index={index()}>
      <ButtonGroup>
        <Button componentClass={Link} href={item.link} paint="info" size="small" view="text" icon={<EyeIcon />} />
        <Button
          componentClass={Link}
          href={`${item.link}/edit`}
          paint="warning"
          size="small"
          view="text"
          icon={<PencilIcon />}
        />
        <SureModal title="Remove" content="Are you sure" onSubmit={onRemove}>
          <Button paint="danger" size="small" view="text" icon={<TrashIcon />} />
        </SureModal>
      </ButtonGroup>
    </ItemCol>
  </ItemRow>
);

export default observer(AdminCompanyListItem);
