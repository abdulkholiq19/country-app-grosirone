import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
  return response.data;
};

export const fetchCountryById = async (id: string) => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
  return response.data[0];
};