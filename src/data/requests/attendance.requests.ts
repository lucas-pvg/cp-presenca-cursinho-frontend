import axios from "axios";

const BASE_URL = 'http://localhost:8000/lesson/1/update_passkey'

export const setPassKey = (passkey: string): boolean => {
  axios.post(BASE_URL, {
    passkey
  }).then(res => {
    console.log(res);
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  })
  return false;
}