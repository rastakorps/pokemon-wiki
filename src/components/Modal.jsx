import { useState, useEffect } from 'react'
import { Spinner } from './Spinner'

function Modal({setModal, currentPokemonId}) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonInfo();
  }, [])

  const getPokemonInfo = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/${currentPokemonId}/?language=es`);
    const result = await response.json();
    
    console.log(result);
    setLoading(false);
  }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-[#ef534f] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <>
                      {loading ? (
                          <Spinner />
                      ) : (
                        <>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Modal Title</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Modal Content
                            </p>
                            <p>{currentPokemonId}</p>
                          </div>
                        </>
                      )}
                    </>
                  </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Modal