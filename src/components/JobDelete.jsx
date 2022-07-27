import { Modal } from "react-bootstrap";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDelete = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    useImperativeHandle(ref, () => ({
        showDeleteModal() {
            setShow(true);
        },
    }));

    const deleteJob = () => {
        props.onConfirmed();
        toast.success("Job Deleted Succesfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setShow(false);
    };

    return (
        <>
            <Modal show={show}>
                <div className="modal-header">
                    <h5 className="modal-title">Please Confirm</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShow(false)}
                    ></button>
                </div>
                <div className="modal-body">
                    Are you sure to delete the selected Job?
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteJob()}
                    >
                        Yes,Delete
                    </button>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
});

export { JobDelete };