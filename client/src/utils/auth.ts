import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token); // Decodes the payload (e.g. id, username)
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Ensures token exists and is valid
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload & { exp?: number }>(token);
      if (!decoded.exp) return true;

      const currentTime = Date.now() / 1000; // convert to seconds
      return decoded.exp < currentTime; // true if expired
    } catch (err) {
      return true; // If decode fails, treat it as expired
    }
  }

  getToken(): string {
    return localStorage.getItem('jwt_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('jwt_token', idToken);
    window.location.assign('/'); // or your Kanban board route (e.g., '/board')
  }

  logout() {
    localStorage.removeItem('jwt_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
