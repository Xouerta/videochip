import httpRequest from '../request/index'


// 获取mov信息
export default function apiGetArtList(param) {
    return httpRequest({
        url: '/public/article',
        method: 'get',
        params: param,
    })
}
