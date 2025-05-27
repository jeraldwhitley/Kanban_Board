import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data: LoginResponse = await response.json();
  return data;
};

export { login };
