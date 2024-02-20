import httpRequest from "../request";

export function SendCode() {
    return httpRequest({
        url: '/user/code',
        method: 'get',
    })
}