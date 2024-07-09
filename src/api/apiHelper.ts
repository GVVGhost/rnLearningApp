import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export interface AxiosInstanceResponse<T = any> {
  success: boolean;
  data: T | null;
  message: any | null;
  status: number;
  headers: any | null;
}

const axiosInstance = async <T = any>(
  config: AxiosRequestConfig,
): Promise<AxiosInstanceResponse<T>> => {
  let ans: AxiosInstanceResponse<T> = {
    success: false,
    data: null,
    message: null,
    status: 0,
    headers: null,
  };
  const baseURL = process.env.REACT_APP_API_URL;
  if (!baseURL) {
    ans.message = 'Error. The base API URL is missing';
    return ans;
  }
  config.baseURL = baseURL;

  // console.log(JSON.stringify(config, null, 2));

  try {
    const res: AxiosResponse<T> = await axios(config);
    ans.headers = res.headers;
    ans.status = res.status;
    ans.data = res.data;
    ans.success = true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        ans.status = err?.response?.status;
        ans.data = err?.response?.data;
        if (ans.status === 500) {
          ans.message = 'Internal Server Error';
        }
      } else if (err.request) {
        ans.message = 'Network error. Check internet connection';
      } else {
        ans.message = 'Error. Something went wrong';
      }
    }
  }

  // console.log(JSON.stringify(ans, null, 2));

  return ans;
};

export default axiosInstance;
