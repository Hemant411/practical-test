const axios = require('axios');
const concurrency = 1000;
const requests = [];

for (let i = 0; i < concurrency; i++) {
  requests.push(
    axios.get('http://localhost:8080/data/profiles')
      .then(res => console.log(`Status: ${res.status}`))
      .catch(err => console.error('Error:', err.response?.status))
  );
}

Promise.all(requests).then(() => {
  console.log('All requests completed.');
});
