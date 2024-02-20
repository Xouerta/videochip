// 导入axios实例
import httpRequest from '../request/index'


// 获取art详细信息
export default function apiGetArtDetail(param) {
    return httpRequest({
        url: '/video_detail',
        method: 'get',
        params: param,
    })
}