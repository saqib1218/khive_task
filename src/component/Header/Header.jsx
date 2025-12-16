import React from 'react';
import applogo from '../../asset/App/applogo.png';

function Header() {
  return (
    <div className="w-full bg-transparent">
      <div className="flex items-center gap-3 py-4 px-4">
        <img src={applogo} alt="App logo" className="h-8 w-8 object-contain" />
        <span className="text-white text-lg font-medium">All Bots</span>
      </div>
      <div className="px-4">
        <div className="h-px w-full bg-[#141519]" />
      </div>
    </div>
  );
}

export default Header;

