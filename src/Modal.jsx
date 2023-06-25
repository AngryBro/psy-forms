import "./css/Modal.css";


export const Modal = ({children, onClose}) => {
    return <div className="modal">
        <div className="modal-container">
            <div className="modal-close" onClick={onClose}>&#10006;</div>
            {children}
        </div>
    </div>
}