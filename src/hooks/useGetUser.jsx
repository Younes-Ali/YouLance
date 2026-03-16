import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const url = "http://localhost:1337/api/users/me";

    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
};

export default useUser;