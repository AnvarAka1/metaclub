import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.metaclub.org/api"
});

export default instance;
