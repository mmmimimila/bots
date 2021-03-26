import React from 'react';
import { Form, FastField } from 'formik';
import { Col, Row } from '@lskjs/grid';
import createForm from '@lskjs/form/createForm';
import Select from '@lskjs/form/controls/Select';

const CompanyListPageFilterView = ({ control }) => (
  <Form>
    <Row>
      <Col md={12}>
        <FastField {...control('tags')} />
      </Col>
    </Row>
  </Form>
);

const CompanyListPageFilter = createForm({
  withI18: true,
  view: CompanyListPageFilterView,
  controls: {
    tags: {
      title: 'companies.formTagsTitle',
      component: Select,
      sortable: true,
      nullOption: {
        title: 'placeholderAll.placeholderAll',
        value: null,
      },
      options: [1, 2].map(value => ({
        value,
        title: `const.tags.${value}`,
      })),
      placeholder: 'placeholderAll.placeholderAll',
    },
  },
});

export default CompanyListPageFilter;
