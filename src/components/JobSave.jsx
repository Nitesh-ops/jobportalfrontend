import { Modal } from "react-bootstrap";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import PostJobsService from "../services/postjobs.services";
import swal from "sweetalert";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Fade from "react-reveal/Fade";

const JobSave = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showJobModal() {
            setShow(true);
        },
    }));

    useEffect(() => {
        setJob(props.job);
    }, [props.job]);

    const [job, setJob] = useState({
        "jobId": 0,
        "postDate": "",
        "jobTitle": "",
        "jobLocation": "",
        "jobDescription": "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveJob = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if(!job.jobId || !job.postDate || !job.jobTitle || !job.jobLocation || !job.jobDescription){
            return "";
        }

        PostJobsService.saveJobs(job)
        .then((response)=>{
            setShow(false);
            setSubmitted(false);
            swal("Thank You", "Job Added Succesfully", "success");
        })
        .catch((err)=>{
            setErrorMessage("Unexpected error occured");
            console.log(err);
        })
        
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <Modal show={show}>
            <form
                 onSubmit={(e) => saveJob(e)}
                noValidate
                className={submitted ? "was-validated" : ""}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Train Details</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShow(false)}
                    ></button>
                </div>
                <div className="modal-body">
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <div className="form-group">
                        <label htmlFor="jobId">Job ID</label>
                        <input
                            type="number"
                            name="jobId"
                            placeholder="Enter Job ID"
                            className="form-control"
                            required
                            value={job.jobId}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            <Fade bottom collapse>
                                <div>Job ID is required</div>
                            </Fade>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="postDate">Job Post Date</label>
                        <input
                            type="date"
                            name="postDate"
                            placeholder="Post Date"
                            className="form-control"
                            required
                            value={job.postDate}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            <Fade bottom collapse>
                                <div>Job Post Date is required</div>
                            </Fade>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job Title"
                            className="form-control"
                            required
                            value={job.jobTitle}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            <Fade bottom collapse>
                                <div>Job Title is required</div>
                            </Fade>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobLocation">Job Location</label>
                        <input
                            type="  "
                            name="jobLocation"
                            placeholder="Job Location"
                            className="form-control"
                            required
                            value={job.jobLocation}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            <Fade bottom collapse>
                                <div>Job Location is required</div>
                            </Fade>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobDescription">Job Description</label>
                        <input
                            type="text"
                            name="jobDescription"
                            placeholder="Job Description"
                            className="form-control"
                            required
                            value={job.jobDescription}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">
                            <Fade bottom collapse>
                                <div>Job Description is required</div>
                            </Fade>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                    >
                        <AiOutlineClose /> Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <AiOutlineSave /> Save Changes
                    </button>
                </div>
            </form>
            <ToastContainer /></Modal>
    );
});

export { JobSave }