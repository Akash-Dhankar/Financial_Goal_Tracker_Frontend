export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch {
    return false;
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles = payload.roles || [];
    return roles.length > 0 ? roles[0].replace('ROLE_', '') : null;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
};
export const logout = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event("authChange")); 
};
