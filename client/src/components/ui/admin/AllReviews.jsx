import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Car,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  Trash2,
  Edit,
  Star,
} from "lucide-react";

// Reviews Management
function AllReviews() {
  const reviews = [
    {
      id: 1,
      car: "BMW 3 Series",
      user: "John Doe",
      rating: 5,
      comment: "Excellent car, very clean and well maintained.",
      date: "2024-03-15",
    },
    {
      id: 2,
      car: "Mercedes C-Class",
      user: "Jane Smith",
      rating: 4,
      comment: "Great experience overall, would rent again.",
      date: "2024-03-14",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{review.car}</h3>
                <p className="text-sm text-gray-600">{review.user}</p>
              </div>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            <div className="mt-2 text-sm text-gray-500">{review.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllReviews;
