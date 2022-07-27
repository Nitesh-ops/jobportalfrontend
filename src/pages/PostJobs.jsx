import { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { JobDelete } from "../components/JobDelete";
import { JobSave } from "../components/JobSave";
import "./PostJobs.css";
import PostJobsService from "../services/postjobs.services";
import ReactPaginate from "react-paginate";

const PostJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const [selectedJob, setSelectedJob] = useState({
        "jobId": 0,
        "postDate": "",
        "jobTitle": "",
        "jobLocation": "",
        "jobDescription": ""
    });

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        setLoading(true);

        PostJobsService.getAllJobs()
            .then((response) => {
                console.log(response.data);
                setJobs(response.data);
                console.log(jobs)

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    const createJob = () => {
        setSelectedJob({
            "jobId": 0,
            "postDate": "",
            "jobTitle": "",
            "jobLocation": "",
            "jobDescription": ""
        });

        saveComponent.current?.showJobModal();
    }

    const editJobRequest = (job) => {
        setSelectedJob(Object.assign({}, job));
        saveComponent.current?.showJobModal();
    };

    const deleteJobRequest = (job) => {
        setSelectedJob(job);
        deleteComponent.current?.showDeleteModal();
    };


    const deleteJob = () => {
        PostJobsService.deleteJob(selectedJob.jobId)
            .then((_) => {
                setJobs(
                    jobs.filter((x) => x.jobId !== selectedJob.jobId)
                );
            })
            .catch((err) => {
                setErrorMessage("Unexpected error Occured");
                console.log(err);
            });
    };

    const [pageNumber, setPageNumber] = useState(0);
    const jobPerPage = 2;
    const pageVisited = pageNumber * jobPerPage;


    const displayJob = jobs.slice(pageVisited, pageVisited + jobPerPage).map((job) => {
        return (
            <div>
                <div className="card-body" key={job.jobId}>
                    <div className="card">
                        <h5 className="card-header">
                            {job.jobTitle}
                        </h5>
                        <div className="card-body">
                            <div className="card-title outer-div">
                                <div className="leftDiv">
                                    <h5>
                                        Post Date: {job.postDate}
                                    </h5>
                                </div>
                                <div className="rightDiv">
                                    <h5>
                                        Location: {job.jobLocation}
                                    </h5>
                                </div>
                            </div>
                            <b>Job Description:</b>  {job.jobDescription}
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-primary me-1"
                            onClick={() => editJobRequest(job)}
                        >
                            <AiFillEdit /> Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteJobRequest(job)}
                        >
                            <AiFillDelete /> Delete
                        </button>
                    </div>
                </div>

            </div>

        )
    })

    const pageCount = Math.ceil(jobs.length / jobPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="container">
                <div className="pt-5">
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}

                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6">
                                    <h3>All Jobs</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => createJob()}
                                    >
                                        <IoMdAdd /> Post Jobs
                                    </button>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            displayJob
                        ) : (
                            <center>
                                {/* <Spinner animation="border" /> */}
                            </center>
                        )}
                        <div className="center">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>

                    </div>
                </div>
            </div>
            <JobSave ref={saveComponent} job={selectedJob} />
            <JobDelete
                ref={deleteComponent}
                onConfirmed={() => deleteJob()}
            ></JobDelete>
        </div>
    )
}

export { PostJobs }