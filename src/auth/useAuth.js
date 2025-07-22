export const useAuth = () => {
  const token = localStorage.getItem('token');
  const setToken = (newToken) => localStorage.setItem('token', newToken);
  const clearToken = () => localStorage.removeItem('token');

  return { token, setToken, clearToken };
};
