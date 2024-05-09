import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const LoadingComponent = ({handleClose, loading}) => {
    return <>
            <Modal show={loading} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div style={{ height: '100px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        </Modal>
    </>
}
LoadingComponent.propTypes = {
    loading: PropTypes.bool,
    handleClose: PropTypes.func
  }

export default LoadingComponent;