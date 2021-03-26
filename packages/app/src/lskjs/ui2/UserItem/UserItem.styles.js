import styled from '@emotion/styled';
import createDynamicTag from '@lskjs/utils/createDynamicTag';
import getTheme from '@lskjs/theme/getTheme';

const dynamicTag = createDynamicTag('div');

export const Title = styled('div')`
  font-family: ${(p) => getTheme(p.theme, 'fontFamily')};
  font-size: 15px;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${(p) => getTheme(p.theme, 'colors.secondary')};
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const AvatarWrapper = styled('div')`
  margin-right: 8px;
  flex-shrink: 0;
  display: flex;
  > div {
    display: flex !important;
  }
`;
export const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Block = styled(dynamicTag)`
  display: flex;
  align-items: center;
  overflow: hidden;
`;
