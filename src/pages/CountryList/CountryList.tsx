import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCountries } from '../../utils/api';
import { Country } from '../../types';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const CountryList: React.FC = () => {
  const navigate = useNavigate(); 
  const [countries, setCountries] = useState<Country[]>([]);
  const [cooperatingCountries, setCooperatingCountries] = useState<any[]>([]);
  const cooperationSelector = useSelector((state: RootState) => state.cooperation.cooperation);
  
  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      
      setCountries(data);
    };
    getCountries();
  }, []);

  useEffect(()=>{
    if(cooperationSelector) {
      const uniqueArray = cooperationSelector.filter((value, index, self) => 
        index === self.findIndex((t) => (
          t.cca3 === value.cca3
        ))
      );
      
      setCooperatingCountries(uniqueArray)
    }
  }, [cooperationSelector])

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
        <div className=" pt-24 pb-4 sm:pt-32 sm:pb-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600 opacity-0 animate-fadeIn" data-testid="country__list__title__1">State Cooperation</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance opacity-0 animate-fadeIn animate-delay-100" data-testid="country__list__title__2">Regarding State Cooperation</p>
              <p className="mt-6 text-lg/8 text-gray-600 opacity-0 animate-fadeIn animate-delay-200" data-testid="country__list__desc">Cooperation between countries is an important element in creating peace, economic progress and social development throughout the world. Through collaboration, we can overcome global challenges and build a better future.</p>
              <div className="relative">
                <button
                  onClick={() => handleClickListCooperation()}
                  className="relative mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 animate-fadeIn animate-delay-100">
                  <span>View List Cooperation</span>

                  {cooperatingCountries.length > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full animate-bounce border-2 border-whit">
                      {cooperatingCountries.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 mx-auto max-w-2xl opacity-0 animate-slideUp animate-delay-300">
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