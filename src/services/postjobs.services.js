import axios from "axios";
import { BASE_API_URL } from "../common/Constant";

const API_URL = BASE_API_URL + "/job";

class PostJobsService {
    getAllJobs() {
        return axios.get(API_URL);
    }

    deleteJob(jobId) {
        return axios.delete(API_URL + "/" + jobId);
    }

    saveJobs(job) {
        return axios.post(API_URL, job);
    }
}

export default new PostJobsService();