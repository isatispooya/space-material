
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'

import { Onrun } from './OnRun'

export const fetcher = (...args) => fetch(...args).then(res => res.json())


export const otp = async ({ mobile, captcha, encrypted_response }) => {
    console.log('Received in otp:', { mobile, captcha, encrypted_response }); // اضافه کردن لاگ
    const response = await axios.post(`${Onrun}/api/otp/`, {
      mobile,
      captcha,
      encrypted_response
    });
  
    if (response.status !== 200) {
      throw new Error('Failed to login');
    }
  
    return response.data;
  };