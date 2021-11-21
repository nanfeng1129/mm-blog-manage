/* eslint-disable */

export const RESP_CODE = {
    SUCCESS: '0',
    FAIL: '1'
}
export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type RES_TYPE = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
export interface AXIOS_CONFIG_TYPE {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: METHOD;
    headers?: any;
    timeout?: number;
    responseType?: RES_TYPE;
    [propName: string]: any;
}

export interface AXIOS_RES {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AXIOS_CONFIG_TYPE;
    request?: any;
}