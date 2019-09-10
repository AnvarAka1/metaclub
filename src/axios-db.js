import axios from "axios";

const instance = axios.create({
	baseURL: "http://mc.test/api"
});

export default instance;
