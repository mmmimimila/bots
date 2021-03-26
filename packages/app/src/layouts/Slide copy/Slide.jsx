import React from 'react';
import BaseSlide from '@lskjs/slide/Slide';

export default ({ children, ...props }) => (
  <BaseSlide
    center
    full
    style={{
      color: '#fff',
    }}
    overlay="rgba(0,0,0,0.85)"
    {...props}
  >
    <div>{children}</div>
  </BaseSlide>
);
