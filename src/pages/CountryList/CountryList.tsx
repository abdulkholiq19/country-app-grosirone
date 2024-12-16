import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCountries } from '../../utils/api';
import { Country } from '../../types';

const CountryList: React.FC = () => {
  const navigate = useNavigate(); 
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      
      setCountries(data);
    };
    getCountries();
  }, []);

  const handleClickDetail = (id: string) => {
    navigate(`/country/${id}`);
  }

  const handleClickListCooperation = () => {
    navigate('/cooperation');
  }

  

  return (
    <>
    <div className="flex justify-center">
      <div className="max-w-screen-lg">
        <div className=" pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600" data-testid="country__list__title__1">State Cooperation</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"data-testid="country__list__title__2">Regarding State Cooperation</p>
              <p className="mt-6 text-lg/8 text-gray-600" data-testid="country__list__desc">Cooperation between countries is an important element in creating peace, economic progress and social development throughout the world. Through collaboration, we can overcome global challenges and build a better future.</p>
              <p className="mt-2 text-sm text-blue-600 cursor-pointer" data-testid="cooperation__link" onClick={() => handleClickListCooperation()}>View List Cooperation</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 mx-auto max-w-2xl">
          {countries.map((country, index) => (
            <div key={index} className="border p-4 rounded-lg">
            <img data-testid='image__flag'src={country.flags.svg} alt={country.name.common} className="rounded-xl h-32 object-cover w-full" />
            <h3 onClick={() => handleClickDetail(country.cca3)} className="font-semibold tracking-tight text-gray-800 md:text-lg text-pretty text-xl pt-4 cursor-pointer">{country.name.common}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CountryList;