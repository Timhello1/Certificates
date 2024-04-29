import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsModal = ({ show, onHide, termsContent }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Terms and Conditions</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {termsContent}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default TermsModal;
