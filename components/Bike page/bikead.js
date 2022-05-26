import React from "react";

const Bikead = () => {
  return (
    <div>
      <div className="text-2xl sm:text-6xl font-bold text-center mt-4 sm:my-8">OUR RIDE</div>
      <div className="flex flex-row sm:justify-center sm:mb-32">
        <img
          className="sm:h-48 sm:w-48 object-scale-down h-10 w-20 border-black border rounded-full m-8"
          src="https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/classic-350/colors/studio-shots/dual-channel/dark-stealth-black/01-dark-stealth-black.png"
        />
        <img
          className="sm:h-48 sm:w-48 object-scale-down h-10 w-20 border-black border rounded-full m-8"
          src="https://www.royalenfield.com/content/dam/royal-enfield/australia/motorcycles/meteor/colours/studio-shots/fireball-yellow/01-yellow.png"
        />
        <img
          className="sm:h-48 sm:w-48 object-scale-down h-10 w-20 border-black border rounded-full m-8"
          src="https://www.roadracingworld.com/wp-content/uploads/2021/11/Royal-Enfield-SG650_concept_studio_0001_1637708303-e1637708420101.jpg"
        />
      </div>
    </div>
  );
};

export default Bikead;
