import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { deleteCooperation } from '../../app/cooperationSlice';
import ModalConfirmation from '../../components/ModalConfirmation';

const CooperationPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cooperationSelector = useSelector((state: RootState) => state.cooperation.cooperation);
  const [cooperatingCountries, setCooperatingCountries] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);


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

  const cancelCooperation = (cca3: string) => {
    setIsModalOpen(true)
    setId(cca3)
  };
  
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate('/');
  }

  const onClose = () => {
    setIsModalOpen(false)
    setIsModalSuccess(false)
  }


  const onConfirm = () => {
    dispatch(deleteCooperation(id))
    setCooperatingCountries(cooperatingCountries.filter((item) => item.cca3 !== id));
    setIsModalOpen(false)
    setIsModalSuccess(true)
  }

  return (
    <>
    <ModalConfirmation
      isModal='delete'
      isOpen={isModalOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      message='Are you sure you want to remove this country from cooperation list?'
      />
    <ModalConfirmation
      isModal='success'
      isOpen={isModalSuccess}
      onClose={onClose}
      onConfirm={onClose}
      message={'Delete Successfully.'}
      />
    <section className="text-gray-700 body-font overflow-hidden opacity-0 animate-fadeIn">
      <div className="container px-5 py-24 mx-auto">
        <div
          onClick={handleGoBack}
          className="cursor-pointer inline-flex items-center py-1.5 rounded-md text-grey-500 hover:bg-grey-50 my-4" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
              </path>
          </svg>
          <span className="ml-1 font-bold text-lg">Back</span>
        </div>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">Cooperation List</p>
        <div className="mt-4">
          {cooperatingCountries.length === 0 ? (
            <>
            <p>No cooperation yet.</p>
            </>
          ) : (
            cooperatingCountries.map((country, index) => (

            <div className="border p-4 mt-2 rounded-lg flex justify-between space-x-5" key={index}>
              <div className='flex gap-4'>
                  <img src={country.flags.svg} alt={country.name.common} className="rounded-xl h-12 object-cover w-24" />
                <div className="flex flex-col">
                <div className="w-full text-lg font-semibold">{country.name.common}</div>
                <div className="w-full text-sm opacity-60">Language : {Object.values(country.languages || {}).join(', ')}</div>
                </div>
              </div>
                <button
                  onClick={() => cancelCooperation(country.cca3)} 
                  className="text-white hover:font-bold bg-red-500 hover:text-white-600 text-sm hover:bg-red-600 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Delete</span>
                </button>
              </div>
          ))
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default CooperationPage;
