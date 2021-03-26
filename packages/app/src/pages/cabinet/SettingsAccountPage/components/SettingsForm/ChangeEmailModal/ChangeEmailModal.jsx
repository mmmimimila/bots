import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '@lskjs/modal';
import T from '@lskjs//t';
import ChangeEmailForm from './ChangeEmailForm';

const ChangeEmailModal = ({ children, updateEmail, ...props }) => {
  const refModal = useRef(null);
  return (
    <Modal ref={refModal} trigger={children} size="small" {...props}>
      <Modal.Title>
        <T name="changeEmailModal.email.title" />
      </Modal.Title>
      <Modal.Content>
        <ChangeEmailForm
          onSubmit={async (params) => {
            // eslint-disable-next-line no-useless-catch
            try {
              await updateEmail(params);
              refModal.current.close();
            } catch (error) {
              throw error;
            }
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
// class ChangeEmailModal extends PureComponent {
//   static propTypes = {
//     children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
//   };
//   static defaultProps = {
//     children: null,
//   };
//   render() {
//     const { children, ...props } = this.props;
//     return (
//       <Modal
//         ref={(modal) => {
//           this.modal = modal;
//         }}
//         trigger={children}
//         size="small"
//         {...props}
//       >
//         <Modal.Title>
//           <T name="changeEmailModal.title" />
//         </Modal.Title>
//         <Modal.Content>
//           <ChangeEmailForm
//             onClose={() => {
//               this.modal.close();
//             }}
//           />
//         </Modal.Content>
//       </Modal>
//     );
//   }
// }

ChangeEmailModal.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  updateEmail: PropTypes.func.isRequired,
};
ChangeEmailModal.defaultProps = {
  children: null,
};

export default ChangeEmailModal;
