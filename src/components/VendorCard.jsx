import React from 'react';

const VendorCard = ({ vendor, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(vendor)}
            className={`
      flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-200 cursor-pointer
      ${isSelected ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-white hover:shadow-xl'}
    `}>
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
                />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">{vendor.role}</span>
                        <br />
                        {vendor.phoneNumber}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;