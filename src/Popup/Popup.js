import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";

export default ({ item, modalOpenFlage }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (item) {
      handleShow();
    }
  }, [item, modalOpenFlage]);

  if (item) {
    const { taskName, create, manager, id } = item;
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>ID: {id}</div>
            <div>Task: {taskName}</div>
            <div>
              Create Date: {moment(create).format("Do MMMM YYYY HH:MM")}
            </div>
            <div>Manager: {manager}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return null;
};
