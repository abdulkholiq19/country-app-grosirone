import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryById } from '../../utils/api';
import { Country } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addCooperation } from '../../app/cooperationSlice';
import ModalConfirmation from '../../components/ModalConfirmation';

const CountryDetailPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cooperationSelector = useSelector((state: RootState) => state.cooperation.cooperation);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);
  const [messageAlreadyOffered, setMessageAlreadyOffered] = useState<string>("");

  const navigate = useNavigate(); 
  const { id } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const isCooporation =  cooperationSelector.find((el) => el.cca3 === id)

  useEffect(() => {
    const getCountry = async () => {
      const data = await fetchCountryById(id || '');
      setCountry(data);
    };
    getCountry();
  }, [id]);

  const offerCooperation = () => {
    setIsModalOpen(true)
  };

  if (!country) return <div>Loading...</div>;

  const handleGoBack = () => {
    navigate('/');
  }

  const confirmCoperation = () => {
    const success = cooperationSelector.find((el) => el.cca3 === country?.cca3)

    if(country !== null) dispatch(addCooperation(country));
    if (success) {
      setIsModalSuccess(true)
      setMessageAlreadyOffered("You have offered cooperation to this country.")
    } else {
      setIsModalOpen(false)
      setIsModalSuccess(true)
      setTimeout(() => {
        setIsModalSuccess(false)
        handleGoBack()
      }, 2000)
    }
  }

  const onClose = () => {
    setIsModalSuccess(false)
    setIsModalOpen(false)
    handleGoBack()
  }

  return (
    <>
    <ModalConfirmation
      isModal='warning'
      isOpen={isModalOpen}
      onClose={onClose}
      onConfirm={confirmCoperation}
      message='Are you sure you want to offer this country cooperation?'
      />
    <ModalConfirmation
      isModal='success'
      isOpen={isModalSuccess}
      onClose={onClose}
      onConfirm={onClose}
      message={messageAlreadyOffered ? messageAlreadyOffered : 'Successfully offer cooperation.'}
      />
    <section className="text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div
            onClick={handleGoBack}
            className="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-md text-grey-500 hover:bg-grey-50 my-4" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            <span className="ml-1 font-bold text-lg">Back</span>
          </div>
          <img src={country.flags.svg} alt={country.name.common} className="w-full object-cover object-center rounded-lg border border-gray-200"/>
          <div className='w-full grid grid-cols-1 justify-between md:grid-cols-2'>
            <div className="w-full lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Languange : <strong>{Object.values(country.languages || {}).join(', ')}</strong></h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{country.name.common}</h1>
              <p className="leading-relaxed py-1">Currency: &nbsp;&nbsp;<strong>{Object.values(country.currencies || {}).map((currency) => currency.name).join(', ')}</strong></p>
              <p className="leading-relaxed py-1">Capital: &nbsp;&nbsp;<strong>{country.capital}</strong></p>
              <p className="leading-relaxed py-1">Independent: &nbsp;&nbsp;<strong>{country.independent ? 'Yes' : 'No'}</strong></p>
              <p className="leading-relaxed py-1">Population: &nbsp;&nbsp;<strong>{country.population}</strong></p>
              <p className="leading-relaxed py-1">Continents: &nbsp;&nbsp;<strong>{country.continents}</strong></p>
              <p className="leading-relaxed py-1">Location: &nbsp;&nbsp;<a href={`https://maps.google.com?q=${country.latlng?.join(',')}`} target="_blank" rel="noopener noreferrer" className='text-blue-400'>Google Maps</a></p>
            </div>
            <div>
              <div className='w-full flex justify-end items-start'>
                <button onClick={offerCooperation} className={`bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-8 ${isCooporation !== undefined ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-600'}`} disabled={isCooporation !== undefined}>Offer Cooperation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default CountryDetailPage;