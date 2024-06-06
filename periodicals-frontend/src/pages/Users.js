import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(response => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;