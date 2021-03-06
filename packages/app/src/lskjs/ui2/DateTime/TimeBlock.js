import styled from '@emotion/styled';
import getTheme from '@lskjs/theme/getTheme';

export default styled('div')`
  font-size: 12px;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => getTheme(p.theme, 'colors.main')};
  font-family: ${p => getTheme(p.theme, 'fontFamily')};
`;
