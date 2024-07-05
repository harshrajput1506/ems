interface User {
  token: string;
  email?: string;
}

export const isAuthenticated = (): boolean => {
  const userString = localStorage.getItem("user");
  if (!userString) return false;
  const user: User = JSON.parse(userString);
  return !!user.token;
};

export const isAdmin = (): boolean => {
  const userString = localStorage.getItem("user");
  if (!userString) return false;
  const user: User = JSON.parse(userString);
  return !!(user.email && user.token);
};

export const getToken = (): string | null => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  const user: User = JSON.parse(userString);
  return user.token || null;
};
