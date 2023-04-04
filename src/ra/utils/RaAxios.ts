import axios, {AxiosError, Method} from "axios";

interface RaAxiosResponse<T = any> {
    status: boolean;
    code: number;
    message: string;
    data: T;

}

type NetworkErrorCallback = (response: AxiosError) => void;
type RequestErrorCallback = (response: RaAxiosResponse) => void;

let _onNetworkErrorCallback: NetworkErrorCallback;
let _onRequestErrorCallback: RequestErrorCallback;

const RaAxios = {
    setOnNetworkErrorCallback: (onNetworkErrorCallback: NetworkErrorCallback) => {
        _onNetworkErrorCallback = onNetworkErrorCallback;
    },
    setOnRequestErrorCallback: (onRequestErrorCallback: RequestErrorCallback) => {
        _onRequestErrorCallback = onRequestErrorCallback;
    },

    ajax: <T>(url: string, method: Method, params?: any, data?: any): Promise<T> => {
        return new Promise((resolve, reject) => {
            axios.request<RaAxiosResponse<T>>({url, method, params, data}).then(res => {
                const response = res.data;
                if (response.status) {
                    resolve(response.data);
                } else {
                    if (_onRequestErrorCallback !== undefined) {
                        _onRequestErrorCallback(response);
                    }
                }
            }).catch((e: AxiosError) => {
                if (_onNetworkErrorCallback !== undefined) {
                    _onNetworkErrorCallback(e);
                }
            })
        })
    },
    get: <T>(path: string, query?: any): Promise<T> => {
        return RaAxios.ajax(path, "get", query);
    },
    post: (path: string, data?: any) => {
        return RaAxios.ajax(path, "post", undefined, data);
    },

};


export default RaAxios;
