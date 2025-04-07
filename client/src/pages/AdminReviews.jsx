import React, { useState } from "react";
import { Star, Plus, Edit, Trash2 } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminReviews = () => {
  // Sample review data
  const [reviews, setReviews] = useState([
    {
      id: "REV-001",
      userId: "USER-001",
      userName: "John Doe",
      carId: "CAR-001",
      carName: "Toyota Camry",
      rating: 4.5,
      review: "Great car, very comfortable and fuel-efficient. Would rent again!",
      date: "2023-10-15"
    },
    {
      id: "REV-002",
      userId: "USER-002",
      userName: "Jane Smith",
      carId: "CAR-003",
      carName: "Ford Explorer",
      rating: 5,
      review: "Perfect SUV for our family trip. Spacious and comfortable for all passengers.",
      date: "2023-11-02"
    },
    {
      id: "REV-003",
      userId: "USER-003",
      userName: "Michael Johnson",
      carId: "CAR-005",
      carName: "Tesla Model 3",
      rating: 5,
      review: "Amazing electric car experience! So quiet and responsive.",
      date: "2023-11-20"
    },
    {
      id: "REV-004",
      userId: "USER-004",
      userName: "Sarah Williams",
      carId: "CAR-002",
      carName: "Honda Civic",
      rating: 3.5,
      review: "Good car overall, but the air conditioning wasn't working properly.",
      date: "2023-12-05"
    },
    {
      id: "REV-005",
      userId: "USER-005",
      userName: "Robert Brown",
      carId: "CAR-006",
      carName: "Grand Vitara",
      rating: 4,
      review: "The SUV was comfortable and handled well on rough terrain. Fuel efficiency was better than expected.",
      date: "2024-01-10"
    }
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentReview, setCurrentReview] = useState(null);

  // Default empty review
  const emptyReview = {
    id: "",
    userId: "",
    userName: "",
    carId: "",
    carName: "",
    rating: 5,
    review: "",
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(emptyReview);

  const handleOpenAddForm = () => {
    setFormData(emptyReview);
    setFormMode('add');
    setOpenForm(true);
  };

  const handleOpenEditForm = (review) => {
    setFormData({...review});
    setFormMode('edit');
    setOpenForm(true);
  };

  const handleOpenDeleteDialog = (review) => {
    setCurrentReview(review);
    setOpenDeleteDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'rating' ? parseFloat(value) : value;
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formMode === 'add') {
      // Generate a new ID
      const newId = `REV-${(reviews.length + 1).toString().padStart(3, '0')}`;
      const newReview = { ...formData, id: newId };
      setReviews([...reviews, newReview]);
      toast.success(`Review for ${newReview.carName} has been added successfully.`);
    } else {
      // Update existing review
      const updatedReviews = reviews.map(review => 
        review.id === formData.id ? formData : review
      );
      setReviews(updatedReviews);
      toast.success(`Review for ${formData.carName} has been updated successfully.`);
    }
    
    setOpenForm(false);
  };

  const handleDeleteReview = () => {
    if (currentReview) {
      const updatedReviews = reviews.filter(review => review.id !== currentReview.id);
      setReviews(updatedReviews);
      toast.error(`Review for ${currentReview.carName} has been deleted.`);
      setOpenDeleteDialog(false);
      setCurrentReview(null);
    }
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<svg key="half" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-400">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <polygon fill="url(#halfGradient)" stroke="currentColor" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>);
    }
    
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Reviews Management</h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleOpenAddForm}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Review
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{review.userName}</div>
                      <div className="text-sm text-gray-500">{review.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {review.carName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStarRating(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-xs truncate">{review.review}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          onClick={() => handleOpenEditForm(review)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          onClick={() => handleOpenDeleteDialog(review)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Form Modal */}
        {openForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {formMode === 'add' ? 'Add New Review' : 'Edit Review'}
                </h3>
                <button
                  onClick={() => setOpenForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="carId" className="block text-sm font-medium text-gray-700">Car ID</label>
                  <input
                    type="text"
                    id="carId"
                    name="carId"
                    value={formData.carId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="carName" className="block text-sm font-medium text-gray-700">Car Name</label>
                  <input
                    type="text"
                    id="carName"
                    name="carName"
                    value={formData.carName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
                  <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {formMode === 'add' ? 'Add Review' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {openDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setOpenDeleteDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toastify Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </main>
    </div>
  );
};

export default AdminReviews;