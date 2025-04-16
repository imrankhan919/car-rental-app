import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebook, FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Support = () => {
  const { theme } = useSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      question: "How do I make a reservation?",
      answer: "You can make a reservation through our website by selecting your desired location, pick-up and drop-off dates, and choosing a vehicle. Alternatively, you can call our reservation center at +1 (800) 555-CARS or visit any of our locations in person."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, a credit card in your name, and proof of insurance. For luxury and exotic cars, we may require additional documentation and a larger security deposit."
    },
    {
      question: "Can I add additional drivers to my rental?",
      answer: "Yes, additional drivers can be added to your rental agreement for a small fee. Each additional driver must be present at the time of rental with a valid driver's license."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Reservations can be canceled free of charge up to 48 hours before the scheduled pick-up time. Cancellations made within 48 hours may incur a cancellation fee equal to one day's rental charge."
    },
    {
      question: "Does CARWALA offer one-way rentals?",
      answer: "Yes, we offer one-way rentals between many of our locations for an additional fee. The fee varies depending on the distance between locations."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns are charged at an hourly rate up to a maximum of one full additional day. We recommend contacting us as soon as possible if you anticipate returning the vehicle late."
    },
    {
      question: "Is insurance included in the rental price?",
      answer: "Basic liability insurance is included in all rentals. We offer additional coverage options including collision damage waiver (CDW), personal accident insurance (PAI), and supplemental liability protection (SLP) for an extra fee."
    },
    {
      question: "Can I rent a car if I'm under 25 years old?",
      answer: "Yes, drivers between 21-24 years old can rent from most of our vehicle categories, but additional young driver fees apply. Some luxury and specialty vehicles may only be available to drivers 25 and older."
    }
  ];

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100 selection:bg-green-600/50' 
        : 'bg-gray-100 text-gray-900 selection:bg-green-500/20'
    }`}>
      <div className={`py-16 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' 
          ? 'bg-gray-800 text-gray-100' 
          : 'bg-gray-900 text-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-green-400' : ''
          }`}>Customer Support</h1>
          <p className="text-xl">We're here to help with any questions or concerns</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className={`rounded-lg shadow-md overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gray-800 text-gray-100 border border-gray-700' 
            : 'bg-white text-gray-900'
        }`}>
          <div className={`flex border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'contact' 
                  ? 'text-green-500 border-b-2 border-green-500' 
                  : theme === 'dark' 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('contact')}
            >
              Contact Us
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'faqs' 
                  ? 'text-green-500 border-b-2 border-green-500' 
                  : theme === 'dark' 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('faqs')}
            >
              FAQs
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-green-400' : ''
                  }`}>Get in Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-md focus:ring-green-500 focus:border-green-500 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-green-600' 
                            : 'border border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-md focus:ring-green-500 focus:border-green-500 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-green-600' 
                            : 'border border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-md focus:ring-green-500 focus:border-green-500 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-green-600' 
                            : 'border border-gray-300'
                        }`}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="reservation">Reservation Inquiry</option>
                        <option value="billing">Billing Issue</option>
                        <option value="vehicle">Vehicle Information</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full p-3 rounded-md focus:ring-green-500 focus:border-green-500 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-green-600' 
                            : 'border border-gray-300'
                        }`}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-md ${
                        theme === 'dark' 
                          ? 'bg-green-600 text-gray-100 hover:bg-green-500' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-green-400' : ''
                  }`}>Contact Information</h2>
                  <div className={`p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="mb-6">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === 'dark' ? 'text-green-400' : ''
                      }`}>Customer Service</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone size={18}/>
                        <span>+1 (800) 555-CARS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={18}/>
                        <span>support@carwala.com</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === 'dark' ? 'text-green-400' : ''
                      }`}>Emergency Roadside Assistance</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone size={18}/>
                        <span>+1 (888) 555-HELP</span>
                      </div>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === 'dark' ? 'text-green-400' : ''
                      }`}>Corporate Headquarters</h3>
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin size={18}/>
                        <span>
                          1234 Luxury Drive<br />
                          Suite 500<br />
                          Los Angeles, CA 90001
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18}/>
                        <span>Mon-Fri: 9:00 AM - 5:00 PM PT</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-green-400' : ''
                    }`}>Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className={`p-3 rounded-full w-10 h-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                        <FaTwitter size={18} />
                      </a>
                      <a href="#" className={`p-3 rounded-full w-10 h-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                        <FaFacebookF size={18}/>
                      </a>
                      <a href="#" className={`p-3 rounded-full w-10 h-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                        <FaInstagram size={18}/>
                      </a>
                      <a href="#" className={`p-3 rounded-full w-10 h-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                        <FaLinkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-green-400' : ''
                }`}>Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`pb-6 border-b ${
                      theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-800'
                    }`}>
                      <h3 className={`text-lg font-medium mb-2 ${
                        theme === 'dark' ? 'text-green-400' : ''
                      }`}>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Can't find the answer you're looking for?</p>
                  <button
                    onClick={() => handleTabChange('contact')}
                    className={`py-2 px-6 rounded-md ${
                      theme === 'dark' 
                        ? 'bg-green-600 text-gray-900 hover:bg-green-500' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    Contact Our Support Team
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;