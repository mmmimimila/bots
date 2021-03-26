import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '@lskjs/modal';
import T from '@lskjs//t';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordModal = ({ children, updatePassword, ...props }) => {
  const refModal = useRef(null);
  return (
    <Modal ref={refModal} trigger={children} size="small" {...props}>
      <Modal.Title>
        <T name="Новый пароль" />
      </Modal.Title>
      <Modal.Content>
        <ChangePasswordForm
          onSubmit={async (params, form) => {
            return form.setFieldError(
              'newPassword',
              <div style={{ whiteSpace: 'pre-line' }}>
                <T name="form.password.validate" />
              </div>,
            );
          }}
          onClose={() => {
            if (refModal && refModal.current) {
              refModal.current.close();
            }
          }}
        />
      </Modal.Content>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  updatePassword: PropTypes.func.isRequired,
};

ChangePasswordModal.defaultProps = {
  children: null,
};

export default ChangePasswordModal;
