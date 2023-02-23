import { useEffect, useState } from 'react';
import { requestGet } from '../../api/Requests';
import { USERS } from '../../api/Urls';
import { translateField } from '../partials/Helpers';

const Home = () => {
  // Create local state;
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [loader, setLoader] = useState(true);

  const getUsers = async () => {
    setLoader(true);
    const response = requestGet(USERS);
    if (response) {
      response.then((response) => setUsers(response.data));
      setLoader(false);
    }
  };

  // Make a template for each user;
  const showUser = () =>
    users
      .filter((data) =>
        data.username.toLowerCase().includes(filterUser.toLowerCase()),
      )
      .map((data) => (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.username}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{translateField(data.is_active)}</td>
          <td>{translateField(data.is_superuser)}</td>
          <td>{data.last_login}</td>
        </tr>
      ));

  // Change order without mutation;
  const handeSort = (e) => {
    const { target } = e;
    const copyArray = [...users];
    copyArray.sort((a, b) => {
      return target.value === '0' ? a.id - b.id : b.id - a.id;
    });
    setUsers(copyArray);
  };

  // Get news users by filter;
  useEffect(() => {
    getUsers();
  }, [filterUser]);

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          {loader === true ? (
            <div className="row d-flex justify-content-md-center align-items-center">
              <div className="spinner-border text-muted" role="status" />
            </div>
          ) : null}
          {users.length > 0 ? (
            <div className="col-md-10 shadow bg-white rounded p-5">
              <h1 className="header mb-3">List of users</h1>
              <div className="row">
                <div className="col-lg-3">
                  <select
                    className="form-select form-control shadow bg-white rounded"
                    defaultValue={0}
                    onChange={handeSort}
                  >
                    <optgroup label="Sort by ID:">
                      <option value={0}>Ascending</option>
                      <option value={1}>Descending</option>
                    </optgroup>
                  </select>{' '}
                </div>

                <div className="col-lg-3">
                  <input
                    className="form-control shadow bg-white rounded"
                    onChange={(e) => setFilterUser(e.target.value)}
                    value={filterUser}
                    type="text"
                    placeholder="filter by username"
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <caption>
                    Count:{' '}
                    {
                      users.filter((data) =>
                        data.username
                          .toLowerCase()
                          .includes(filterUser.toLowerCase()),
                      ).length
                    }
                  </caption>
                  <thead>
                    <tr className="font-weight-bold">
                      <td>ID</td>
                      <td>Username</td>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>Is active</td>
                      <td>Is superuser</td>
                      <td>Last login</td>
                    </tr>
                  </thead>
                  <tbody>{showUser()}</tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Home;
