import axios from 'axios';

export const getData = async (url) => {
  const res = await axios(url);

  if (res.status === 200) {
    return res.data;
  } else {
    return res;
  }
};
