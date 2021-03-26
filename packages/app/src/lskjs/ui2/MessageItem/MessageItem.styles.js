import styled from '@emotion/styled';
// import getTheme from '@lskjs/theme/getTheme';

export const MessageWrapper = styled('div')`
  display: flex;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  img {
    padding-right: 8px;
  }
`;
export const TextWrapper = styled('div')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default null;
