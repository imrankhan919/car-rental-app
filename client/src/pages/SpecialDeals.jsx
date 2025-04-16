import React from 'react';
import { useSelector } from 'react-redux';

const SpecialDeals = () => {
  const { theme } = useSelector((state) => state.theme); // Access theme from Redux store

  const deals = [
    {
      id: 1,
      title: "Weekend Getaway",
      description: "Enjoy a 3-day weekend rental with 20% off on all luxury vehicles.",
      discount: "20% OFF",
      validUntil: "April 30, 2025",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      code: "WEEKEND20",
      category: "luxury"
    },
    {
      id: 2,
      title: "Business Trip Special",
      description: "Book any sedan for 5+ days and get a free upgrade to premium class.",
      discount: "Free Upgrade",
      validUntil: "May 15, 2025",
      image: "https://img.freepik.com/premium-photo/indian-business-man-walking-outside-station-airport-talking-phone-carrying-suitcase_161094-5382.jpg?uid=R181582856&ga=GA1.1.2051497020.1727675711&semt=ais_hybrid&w=740",
      code: "BTRIP",
      category: "business"
    },
    {
      id: 3,
      title: "Electric Experience",
      description: "Try any of our electric vehicles and get 15% off your first rental.",
      discount: "15% OFF",
      validUntil: "June 1, 2025",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      code: "GOGREEN",
      category: "electric"
    },
    {
      id: 4,
      title: "Summer Road Trip",
      description: "Book any SUV for 7+ days and receive a $100 fuel card.",
      discount: "$100 Fuel Card",
      validUntil: "August 31, 2025",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      code: "ROADTRIP",
      category: "suv"
    },
    {
      id: 5,
      title: "Exotic Car Experience",
      description: "Book one of our exotic cars for 2+ days and get the third day free.",
      discount: "1 Day Free",
      validUntil: "May 31, 2025",
      image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      code: "EXOTIC3",
      category: "exotic"
    },
    {
      id: 6,
      title: "First-Time Renter",
      description: "First time renting with us? Enjoy 10% off any vehicle.",
      discount: "10% OFF",
      validUntil: "December 31, 2025",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      code: "FIRSTTIME",
      category: "all"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-green-600 text-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Special Deals & Promotions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Take advantage of our limited-time offers and save on your next premium car rental.
          </p>
        </div>
      </div>

      {/* Deals */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className={`rounded-lg overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
              <div className="relative h-48">
                <img className="w-full h-full object-cover" src={deal.image} alt={deal.title} />
                <div className={`absolute top-0 right-0 py-1 px-3 m-2 rounded-md font-bold ${theme === 'dark' ? 'bg-green-500 text-gray-900' : 'bg-green-600 text-white'}`}>
                  {deal.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{deal.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded uppercase ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>{deal.category}</span>
                </div>
                <p className="mb-4">{deal.description}</p>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Valid until: {deal.validUntil}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Promo code: <span className="font-mono font-semibold">{deal.code}</span></span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className={`flex-1 py-2 px-4 rounded ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600 text-gray-900' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    Book Now
                  </button>
                  <button className={`flex-1 py-2 px-4 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className={`py-16 px-4 sm:px-6 lg:px-8 mt-12 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get Exclusive Offers</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter and be the first to know about our special deals and promotions.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-grow p-3 rounded-l-md focus:outline-none focus:ring focus:ring-green-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'}`}
              />
              <button className={`py-3 px-6 rounded-r-md ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600 text-gray-900' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDeals;