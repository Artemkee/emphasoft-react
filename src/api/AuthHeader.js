import { getFromSessionStorage } from "../components/partials/Helpers";

export default function authHeader() {
  const token = getFromSessionStorage('user');

  if (token) {
    return { Authorization: `Token ${token}` };
  } else {
    return {};
  }
}
