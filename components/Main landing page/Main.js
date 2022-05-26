import React from "react";
import Link from "next/link";
import Image from "next/image";

const Main = () => {
  const MainPageAbout = [
    {
      img1: "https://www.ritiriwaz.com/wp-content/uploads/2020/02/Sikkim-Culture-1.jpg",
      heading: "People and Culture",
      Content:
        "The People of Sikkim consist of three ethnic groups, that is, Lepcha, Bhutia and Nepali. Communities of different hues intermingle freely in Sikkim to constitute a homogenous blend. Hindu Temples coexist with Buddhist Monasteries, Churches, Mosque and Gurudwara. The predominant Communities are Lepchas, Bhutias and Nepalese.",
    },
    {
      img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0l2c6cbe0vg7QBnhDXlqgvWRMxvBfk5iDg&usqp=CAU",
      heading: "Taste of Sikkim",
      Content:
        "Sikkimese food is largely based on culinary vegetables from jungle like Ningro (Fern), Nakima (Wild Lily), Baas ko Tusa (Bamboo-Shoot), Cheuw (Mushrooms), etc. Even organic vegetables such as Iskus (Chayote/ Squash), Pharsi (pumpkin), Pharsi ko Munta (Pumpkin leaves), Iskus ko Munta (Chayote/ Squash leaves), Kinema (Fermented Soyabean), Ruk Tamatar ( Tree Tomato) and Dalle Chillies (Hot Fire Balls), etc.",
    },
    {
      img1: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kangchenjunga-from-Gangtok.jpg/800px-Kangchenjunga-from-Gangtok.jpg",
      heading: "Kanchenjunga",
      Content:
        "The name Kanchenjunga is derived from four words of Tibetan origin, usually rendered Kang-chen-dzo-nga or Yang-chhen-dzö-nga and interpreted in Sikkim as the “Five Treasuries of the Great Snow.” The mountain holds an important place in the mythology and religious ritual of the local inhabitants of Sikkim, and its slopes were no doubt familiar to herdsmen and traders for centuries before a rough survey of it was made. Khangchendzonga, is the third highest mountain in the world. Its summit lies at 8,586 m (28,169 ft) in a section of the Himalayas.",
    },
  ];
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-8 pb-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-indigo-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                About Sikkim
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                Sikkim is the top most tours & travel destination in India. It
                is one of the most politically stable and peaceful place in
                India. This landlocked state is blessed with some of the most
                spectacular landscapes, flora and fauna making it a haven for
                adventure enthusiasts and naturalists. Lying at an elevation of
                8,586 metres, the {`state's`} highest point is the summit of
                Kanchenjunga, the third highest peak of the world. Sikkim
                tourism has lots to offer a discerning traveller. Foreigners
                here can visit Gangtok, Rumtek, Phodong, Pemayangtse and the
                Yuksom -Zongri trekking route on the basis of restricted area
                permits which can be obtained. There are numerous Lakes and
                Monasteries which make the hill station vibrant and lively. To
                experience complete rejuvenation, book our Sikkim tour packages
                with airfare.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {MainPageAbout.map((icon, index) => {
              return (
                <div key={index} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                  <div className="rounded-lg h-64 overflow-hidden">
                    <img
                      src={icon.img1}
                      // layout="fill"
                      alt="content"
                      className="object-cover object-center h-full w-full"
                    />
                  </div>
                  <h2 className="text-center text-xl font-medium title-font text-gray-900 mt-5">
                    {icon.heading}
                  </h2>
                  <p className="text-base leading-relaxed mt-2">
                    {icon.Content}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 h-1 bg-gray-200 rounded overflow-hidden mb-5">
            <div className="w-24 h-full bg-indigo-500"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
