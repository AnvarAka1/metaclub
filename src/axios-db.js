import axios from "axios";

const instance = axios.create({
	baseURL: "http://api.metaclub.org/api"
});

export default instance;
