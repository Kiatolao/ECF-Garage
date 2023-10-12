import React from 'react'


export const Footer = () => {
  return (
    <>
      <footer className="bg-white shadow dark:bg-stone-800 mt-5">
        <div className=" mx-auto w-full p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Kiato</a>. Tous droits réservés.</span>
        </div>
      </footer>
    </>
  )
}
