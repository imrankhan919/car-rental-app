import React from "react";



const StatCard = ({ title, value, icon: Icon, trend, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className="p-2 bg-blue-50 rounded-md">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;