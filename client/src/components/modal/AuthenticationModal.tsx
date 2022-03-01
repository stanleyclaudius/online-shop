import React from 'react'
import Login from './../authentication/Login'

interface IProps {
  authenticationRef: React.MutableRefObject<HTMLDivElement>
  openAuthenticationModal: boolean
  setOpenAuthenticationModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthenticationModal: React.FC<IProps> = ({ authenticationRef, openAuthenticationModal, setOpenAuthenticationModal }) => {
  return (
    <div className={`${openAuthenticationModal ? 'opacity-100' : 'opacity-0'} ${openAuthenticationModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div ref={authenticationRef} className={`${openAuthenticationModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[800px] bg-white rounded-md`}>
        <Login setOpenAuthenticationModal={setOpenAuthenticationModal} />
      </div>
    </div>
  )
}

export default AuthenticationModal