import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 여기에 백엔드 API 서버의 기본 URL을 설정합니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (선택 사항)
// api.interceptors.request.use((config) => {
//   // JWT 토큰을 Authorization 헤더에 추가하는 코드
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default api;
