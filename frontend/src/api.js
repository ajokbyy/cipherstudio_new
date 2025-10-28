const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    return null;
  }
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

const API = {
  // Auth
  register: (email, password) => request("/auth/register", { method: "POST", body: { email, password } }),
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),

  // Projects
  listProjects: () => request("/projects"),
  createProject: (data) => request("/projects", { method: "POST", body: data }),
  getProject: (id) => request(`/projects/${id}`),
  updateProject: (id, data) => request(`/projects/${id}`, { method: "PUT", body: data }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" })
};

export default API;




