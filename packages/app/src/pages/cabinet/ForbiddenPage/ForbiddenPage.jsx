import React from 'react';
import Link from '@lskjs/link';
import Button from '@lskjs/button';
import ButtonGroup from '@lskjs/button/ButtonGroup';
import T from '@lskjs/t';
import Page from '@lskjs/page';

export default ({ about = {}, r }) => (
  <Page layout={Page.CabinetLayout}>
    <Page.Header />
    <Page.Body>
      <ButtonGroup padded style={{ marginTop: 30, width: 400 }}>
        {r && (
          <Button componentClass={Link} paint="primary" href={r}>
            <T name="buttons.retry" />
          </Button>
        )}
        {about.email && (
          <Button componentClass={Link} href={`mailto:${about.contactEmail}`}>
            Связаться с администратором
          </Button>
        )}
      </ButtonGroup>
    </Page.Body>
  </Page>
);
