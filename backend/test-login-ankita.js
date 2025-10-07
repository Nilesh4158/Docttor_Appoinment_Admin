import axios from 'axios';

const backendUrl = 'http://127.0.0.1:4000';

(async () => {
  try {
    console.log('Pinging backend root...');
    const ping = await axios.get(backendUrl + '/');
    console.log('Root response:', ping.status, ping.data);

    console.log('\nTrying doctor login...');
    const login = await axios.post(backendUrl + '/api/doctor/login', {
      email: 'ankita@gmail.com',
      password: 'ankita123'
    }, { timeout: 8000 });
    console.log('Login:', login.status, login.data);

    if (login.data?.success) {
      const token = login.data.token;
      console.log('\nToken received length:', token?.length);

      console.log('\nFetching dashboard...');
      const dash = await axios.get(backendUrl + '/api/doctor/dashboard', {
        headers: { dToken: token, Authorization: `Bearer ${token}` }
      });
      console.log('Dashboard:', dash.status, dash.data);
    }
  } catch (err) {
    if (err.response) {
      console.log('HTTP Error:', err.response.status, err.response.statusText);
      console.log('Data:', err.response.data);
    } else if (err.request) {
      console.log('No response. Request options:', err.config?.method, err.config?.url);
    } else {
      console.log('Error:', err.message);
    }
  }
})();
