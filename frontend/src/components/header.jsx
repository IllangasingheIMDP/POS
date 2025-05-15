import React from 'react'

const Header = ({title}) => {
      // Get today's date in a readable format
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
   <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-white font-pathway">{title}</h1>
            <p className="text-lg text-stone-300/90 font-inter">{formattedDate}</p>
          </div>
          <div className="flex space-x-4">
            
            <button className="p-2 bg-stone-700 rounded-[10px]">
              <img src="/adminprofile.jpg" alt="profile" className="w-7 h-7" />
            </button>
          </div>
        </div>
  )
}

export default Header