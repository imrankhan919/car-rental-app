import { Search, Shield, Clock, ThumbsUp, Phone, Fuel } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const trendingCars = [
    {
      name: "BMW 3 Series",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000",
      fuelType: "Hybrid",
      rate: "$75/day",
    },
    {
      name: "Mercedes C-Class",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000",
      fuelType: "Petrol",
      rate: "$85/day",
    },
    {
      name: "Audi A4",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000",
      fuelType: "Diesel",
      rate: "$80/day",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/70">
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div className="text-center max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-6">
                Find Your Perfect Ride
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Luxury and comfort at competitive prices
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 shadow-lg w-full max-w-2xl mx-auto">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search for cars..."
                  className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition flex items-center space-x-2">
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Cars Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Trending Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCars.map((car, index) => (
              <div key={index} className="bg-white shadow">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {car.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-gray-600 mt-2">
                    <Fuel size={16} />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-800">
                      {car.rate}
                    </span>
                    <button className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 transition">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-gray-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                All our vehicles are regularly maintained and fully insured
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-gray-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support for your peace of mind
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="text-gray-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Best Rates
              </h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden charges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to hit the road?</h2>
          <p className="text-gray-300 mb-8">
            Contact us now and get the best deals on car rentals
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition flex items-center space-x-2 mx-auto">
            <Phone size={20} />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
