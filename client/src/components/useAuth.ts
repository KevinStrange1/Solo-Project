import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    axios
      // .post('http://localhost:3001/login', {
      .post('https://groovyguru.vercel.app/login', {
        code: code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, '', '/');
      })
      .catch(() => {
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        // .post('http://localhost:3001/refresh', {
        .post('https://groovyguru.vercel.app/refresh', {
          refreshToken: refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
