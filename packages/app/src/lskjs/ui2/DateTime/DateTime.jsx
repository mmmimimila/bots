import React from 'react';
import PropTypes from 'prop-types';
import m from 'moment';
import DateBlock from './DateBlock';
import TimeBlock from './TimeBlock';

const DateTime = ({ value, dateFormat, timeFormat }) => (
  <div>
    <DateBlock>{m(value).format(dateFormat)}</DateBlock>
    <TimeBlock>{m(value).format(timeFormat)}</TimeBlock>
  </div>
);

DateTime.propTypes = {
  value: PropTypes.any,
  dateFormat: PropTypes.any,
  timeFormat: PropTypes.any,
};
DateTime.defaultProps = {
  value: null,
  dateFormat: 'DD.MM.YYYY',
  timeFormat: 'HH:mm',
};

export default DateTime;
