import React from 'react';
import { WarningSvg } from '../assets/svgs/WarningSvg';
import { DeleteSvg } from '../assets/svgs/DeleteSvg';
import SuccessSvg from '../assets/svgs/SuccessSvg';
import ErrorSvg from '../assets/svgs/ErrorSvg';

interface ConfirmationModalProps {
  isModal: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}


const ModalConfirmation: React.FC <ConfirmationModalProps>= ({isOpen, onClose, onConfirm, message, isModal}) => {
  if (!isOpen) return null;

  const renderSvg = () => {
    return (
      <>
      {
        isModal === 'warning' ? (
          <>
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
            <WarningSvg/>
          </div>
          </>
        ) : isModal === 'delete' ? (
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <DeleteSvg />
          </div>

        ) : isModal === 'success' ? (
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
            <SuccessSvg />
          </div>
        ): isModal === 'error' ? (
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <ErrorSvg />
          </div>
        ) : null
      }
      </>
    )
  }
  
  const renderButton = () => {
    return (
      <>
      {
        isModal === 'warning' ? (
          <button type="button" className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto" onClick={() =>onConfirm()}>Confirm</button>
        ) : isModal === 'delete' ? (
          <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() =>onConfirm()}>Delete</button>
        ) : null
      }
      </>
    )
  }

  const renderTitle = () => {
    switch (isModal) {
      case 'warning':
        return 'Offer Cooperation'
      case 'delete':
        return 'Delete Cooperation'
      case 'success':
        return 'Success'
      case 'error':
        return 'Cooperation Failed'
      default:
        break;
    }
  }

  return (
    <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
       <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-4/5 sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {renderSvg()}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-900" id="modal-title">{renderTitle()}</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {renderButton()}
              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>{isModal === 'success' || isModal === 'error' ? 'Close' : 'Cancel'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ModalConfirmation