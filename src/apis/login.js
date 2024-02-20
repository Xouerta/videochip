// 导入axios实例
import httpRequest from '../request/index'

// 注册
export function register(data) {
	return httpRequest({
		url: '/user/register',
		method: 'post',
		data: data,
	})
}

// 登录
export default function login(data) {
    return httpRequest({
		url: '/user/login',
		method: 'post',
		data: data,
	})
}

// 获取用户信息
export function getUserInfo() {
	return httpRequest({
		url: '/user',
		method: 'get',
	})
}
