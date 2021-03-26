import React from 'react';
import BaseSlide from '@lskjs/slide/Slide';

export default ({ children, ...props }) => (
  <BaseSlide
    center
    full
    overlay="rgba(0,0,0,0.85)"
    video={__DEV__ ? null : 'https://demo.syndicad.com/bg.webm'}
    image="https://syndicad.com/c82aa481daa4b9038342b922678e33dc.jpg"
    {...props}
  >
    <div>{children}</div>
  </BaseSlide>
);
