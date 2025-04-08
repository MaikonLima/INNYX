import { jwtDecode } from 'jwt-decode';
import { useLoginStore } from '../store/loginStore';
import ApiStock from '../services/Api/ApiStock';
import type { JwtPayload } from '../interfaces/interfaces';

export default async function Auth(credentials: { email: string; password: string }) {
  try {
    const response = await ApiStock.post('/auth/login', credentials);

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    const decoded = jwtDecode<JwtPayload>(accessToken);

    const payload = {
      data: {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        roles: decoded.roles,
      },
      token: accessToken,
    };

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    const userStore = useLoginStore();
    userStore.setUser(payload);
    return payload;
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    throw error;
  }
}
