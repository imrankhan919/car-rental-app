import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getRental, updateCarRental } from '../features/rental/rentalSlice';

const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // pad to 2 digits
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const ModifyBookingModal = ({ onClose }) => {
  const { rentalEdit } = useSelector((state) => state.rental);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    pickupDate: '',
    dropDate: ''
  });

  useEffect(() => {
    if (rentalEdit.isEdit && rentalEdit.edit) {
      const formatted = {
        pickupDate: formatDateForInput(rentalEdit.edit.pickupDate),
        dropDate: formatDateForInput(rentalEdit.edit.dropDate)
      };
      setFormData(formatted);
    }
  }, [rentalEdit]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      pickupDate: formData.pickupDate,
      dropDate: formData.dropDate,
      rid: rentalEdit.edit._id
    };

    try {
      console.log('Submitting:', updatedData);
      await dispatch(updateCarRental(updatedData)).unwrap();
      await dispatch(getRental(rentalEdit.edit._id)).unwrap();
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Something went wrong while updating the rental.');
    }
  };

  const overlayClasses = "fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center min-h-screen overflow-y-auto";
  const modalClasses = `rounded-lg shadow-2xl w-full max-w-lg z-50 transform transition-all duration-300 ease-in-out border ${theme === "dark" ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-200"
    }`;

  return (
    <div className={overlayClasses}>
      <div ref={modalRef} className={modalClasses}>
        <div className={`flex justify-between items-center border-b p-4 md:p-6 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}>
          <h2 className="text-xl md:text-2xl font-bold">Modify Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X size={24} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <fieldset className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
            <legend className={`text-sm font-medium px-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>Rental Period</legend>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pickupDate" className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                  <Calendar size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} /> Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData?.pickupDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === "dark"
                      ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-emerald-500"
                      : "bg-white text-gray-900 border-gray-300 focus:ring-emerald-500"
                    }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dropDate" className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                  <Calendar size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} /> Drop Date
                </label>
                <input
                  type="date"
                  id="dropDate"
                  name="dropDate"
                  value={formData?.dropDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === "dark"
                      ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-emerald-500"
                      : "bg-white text-gray-900 border-gray-300 focus:ring-emerald-500"
                    }`}
                />
              </div>
            </div>
          </fieldset>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyBookingModal;
