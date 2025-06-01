import { API_URL } from '@shared/model';
import axios  from 'axios';


export const client = axios.create({
  baseURL: API_URL,
})