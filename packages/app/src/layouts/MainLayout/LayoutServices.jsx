import React, { useRef } from 'react';
import { inject } from '@lskjs/uapp/mobx-react';
import NotificationSystem from '@lskjs/notification';
import ProgressSystem from '@lskjs/progress/ProgressSystem';

const LayoutServices = ({ uapp }) => {
  if (!uapp) return null;
  // eslint-disable-next-line no-param-reassign
  uapp.notificationSystem = useRef(null);
  // eslint-disable-next-line no-param-reassign
  uapp.progress = useRef(null);
  return (
    <>
      <NotificationSystem ref={uapp.notificationSystem} />
      <ProgressSystem ref={uapp.progress} />
    </>
  );
};

export default inject('uapp')(LayoutServices);
