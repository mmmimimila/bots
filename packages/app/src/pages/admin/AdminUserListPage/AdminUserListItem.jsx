import Button from '@lskjs/button';
import ButtonGroup from '@lskjs/button/ButtonGroup';
import Link from '@lskjs/link';
import List from '@lskjs/list';
import { createIndex, ItemCol, ItemRow } from '@lskjs/list/Table';
import sure from '@lskjs/modal/hoc/sure';
import T from '@lskjs/t';
import ChipItem from '@lskjs/ui/ChipItem';
import DateInfo from '@lskjs/ui/DateInfo';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import CalendarMultiIcon from 'react-icons2/mdi/calendar-multiple';
import EyeIcon from 'react-icons2/mdi/eye';
import LoginIcon from 'react-icons2/mdi/login';
import PencilIcon from 'react-icons2/mdi/pencil';
import TrashIcon from 'react-icons2/mdi/trash';

const SureModal = sure();

// const AdaptiveButtonGroup = adaprive(ButtonGroup, {});
// match={{
//   type: 'screen',
//   minWidth: 1115,
// }}

const AdminUserListItem = ({ item = {}, index = createIndex(), handleApprove, handleRemove }) => (
  <List.SelectRow item={item}>
    <ItemRow>
      <ItemCol index={index()}>
        <List.Checkbox item={item} />
      </ItemCol>
      <ItemCol index={index()}>
        <ChipItem item={item}>{`${get(item, 'info.phone')}, ${get(item, 'email')}`}</ChipItem>
      </ItemCol>
      <ItemCol index={index()}>
        <T name={`roles.${get(item, 'role')}`} />
      </ItemCol>
      <ItemCol index={index()}>
        <DateInfo value={get(item, 'createdAt')} />
      </ItemCol>
      <ItemCol index={index()}>
        <DateInfo value={get(item, 'visitedAt')} time />
      </ItemCol>
      <ItemCol index={index()}>
        <div style={{ paddingLeft: 8 }}>
          {get(item, 'meta.approvedEmail') ? <T name="admin.approved" /> : <T name="admin.disapproved" />}
          <br />
          <If condition={!get(item, 'meta.approvedEmail')}>
            <Button onClick={handleApprove} paint="success" size="extraSmall" view="text" style={{ marginLeft: -8 }}>
              <T name="admin.approve" />
            </Button>
          </If>
        </div>
      </ItemCol>
      <ItemCol index={index()} align="right">
        <ButtonGroup>
          <Button
            componentClass={Link}
            href={`/cabinet/users/${get(item, '_id')}`}
            paint="info"
            size="small"
            view="text"
            icon={<EyeIcon />}
          />
          <Button
            componentClass={Link}
            href="/admin/eventUsers"
            qs={{ filter: { userId: get(item, '_id') } }}
            paint="primary"
            size="small"
            view="text"
            icon={<CalendarMultiIcon />}
          />
          <Button
            componentClass="a"
            target="_blank"
            href={`/api/admin/login?_id=${get(item, '_id')}`}
            paint="warning"
            size="small"
            view="text"
            icon={<LoginIcon />}
          />
          <Button
            componentClass={Link}
            href={`/cabinet/users/${get(item, '_id')}/edit`}
            paint="warning"
            size="small"
            view="text"
            icon={<PencilIcon />}
          />
          <SureModal title="Remove" content="Are you sure" onSubmit={handleRemove}>
            <Button paint="danger" size="small" view="text" icon={<TrashIcon />} />
          </SureModal>
        </ButtonGroup>
      </ItemCol>
    </ItemRow>
  </List.SelectRow>
);

AdminUserListItem.propTypes = {
  index: PropTypes.func.isRequired,
  item: PropTypes.objectOf(Object).isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default AdminUserListItem;
