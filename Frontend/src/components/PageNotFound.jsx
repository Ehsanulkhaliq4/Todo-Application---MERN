import React from 'react'

function PageNotFound() {
  return (
    <>
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Page not found</p>
        <p className="mt-2 text-gray-500">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">Go back to Home</a>
      </div>
    </div>
    </>
  )
}

export default PageNotFound