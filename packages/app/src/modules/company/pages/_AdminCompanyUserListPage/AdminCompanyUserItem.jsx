import React, { Component } from 'react';
import get from 'lodash/get';
import PencilIcon from 'react-icons2/mdi/pencil';
import Modal from '@lskjs/modal';
import { observer } from '@lskjs/uapp/mobx-react';
import Button from '@lskjs/button';
import DateInfo from '@lskjs/ui/DateInfo';
import ChipItem from '@lskjs/ui/ChipItem';
import { ItemRow, ItemCol, createIndex } from '@lskjs/list/Table';
// import CompanyUserFilterModalForm from './CompanyUserFilterModalForm';
// import CompanyUserSureModal from './CompanyUserSureModal';

@observer
class Item extends Component {
  render() {
    const index = createIndex();
    const { item = {}, innerRef = React.createRef() } = this.props;
    const position = get(item, 'position');
    console.log('innerRef', innerRef);

    return (
      <ItemRow>
        <ItemCol index={index()}>
          <ChipItem link item={get(item, 'company')} />
        </ItemCol>
        <ItemCol index={index()}>
          <ChipItem link item={get(item, 'user')} />
        </ItemCol>
        <ItemCol index={index()}>
          <DateInfo value={get(item, 'company.updatedAt')} time />
        </ItemCol>
        <ItemCol index={index()}>{position ? position.trim() : '-'}</ItemCol>
        <ItemCol index={index()}>
          {/* <Modal
            ref={innerRef}
            closable={false}
            trigger={<Button paint="warning" size="small" view="text" icon={<PencilIcon />} />}
          >
            <CompanyUserFilterModalForm
              item={item}
              modal={innerRef}
              store={this.constructor.listStore}
              values={{ position }}
            />
          </Modal>
          <CompanyUserSureModal item={item} store={this.constructor.listStore} /> */}
        </ItemCol>
      </ItemRow>
    );
  }
}

export default Item;
