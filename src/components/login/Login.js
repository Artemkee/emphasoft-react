import { useState } from 'react';
import { requestPost } from '../../api/Requests';
import { LOGIN } from '../../api/Urls';
import { setToSessionStorage } from '../partials/Helpers';

const Login = ({ setToken }) => {
  // Create local state;
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  // Get token;
  const signIn = async () => {
    const response = await requestPost(LOGIN, {
      username: userName,
      password: password,
    });

    if (response) {
      setToken(response.token);
      setToSessionStorage('user', response.token);
    }
  };

  // Let's control input data;
  const onChangeData = (e) => {
    const { target } = e;
    const key = target.getAttribute('data-key');

    switch (key) {
      case 'username':
        setUserName(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        console.log('Not matching any case');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="login-form shadow p-3 bg-white rounded">
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User name
                </label>
                <input
                  type="text"
                  className="form-control"
                  data-key="username"
                  placeholder="Enter username"
                  onChange={onChangeData}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  data-key="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={onChangeData}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={signIn}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
