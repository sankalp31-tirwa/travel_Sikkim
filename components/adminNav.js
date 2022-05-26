import React from "react";

const AdminNav = () => {
  return (
    <div>
      <header className="text-gray-600 body-font bg-blue-400">
        <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto"></nav>

          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <span className="ml-3 text-3xl font-bold">Admin Page</span>
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0"></div>
        </div>
      </header>
    </div>
  );
};

export default AdminNav;
