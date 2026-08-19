import React, { useEffect } from 'react';
import { useSearch } from '../context/SearchContext';

export const AccountPage: React.FC = () => {
  const { openAccount } = useSearch();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Account Dashboard | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-20 text-center">
      <div className="max-w-md mx-auto px-6 space-y-6">
        <h1 className="font-serif text-4xl text-[#294A3A]">ACCOUNT</h1>
        <p className="text-xs uppercase tracking-wider text-[#294A3A]/70">
          Manage your profile, saved addresses, and order history.
        </p>
        <button
          onClick={openAccount}
          className="gw-button-primary w-full py-4 text-xs"
        >
          SIGN IN / REGISTER
        </button>
      </div>
    </div>
  );
};
