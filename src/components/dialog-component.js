import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import PropTypes from 'prop-types';


export const SUCCESS = 'success';
export const FAIL = 'fail';
export const WARNING = 'warning';

const DialogComponent = ({ typeDialog = SUCCESS, message = 'Thông báo', onClick = () => { }, show = true }) => {
    return <Modal show={show} onHide={onClick}>
        <Modal.Header closeButton>
            <div style={{ width: '100%', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}
                className={typeDialog == SUCCESS ? 'text-success' : typeDialog == FAIL ? 'text-danger' : 'text-warning'}>
                {typeDialog == SUCCESS ? 'Thành công' : typeDialog == FAIL ? 'Lỗi' : 'Cảnh báo'}
            </div>
        </Modal.Header>
        <Modal.Body >
            <div style={{textAlign:'center', fontSize: '18px', fontWeight: '500'}}>
            {message}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant= {typeDialog == SUCCESS?"success":typeDialog == FAIL?'danger':'warning'} onClick={onClick}>
                OK
            </Button>
        </Modal.Footer>
    </Modal>
}
DialogComponent.propTypes = {
    typeDialog: PropTypes.string,
    message: PropTypes.string,
    onClick: PropTypes.func,
    show: PropTypes.bool
}
export default DialogComponent;
