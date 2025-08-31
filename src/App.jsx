import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Reusable Modal Component
const Modal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Message</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Button Component
const Button = ({ children, onClick, className = '', disabled = false, loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
        ${disabled || loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'hover:opacity-90 active:scale-95'
        }
      `}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

// Reusable Vendor Card Component
const VendorCard = ({ vendor, isSelected, onSelect }) => {
  return (
    <div className={`
      flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-200
      ${isSelected ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-white hover:shadow-xl'}
    `}>
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(vendor)}
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

// Main App component combining reusable components
const App = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const vendors = [
    { id: '1', name: 'John Doe', role: 'Electrician', phoneNumber: '+1234567890' },
    { id: '2', name: 'Jane Smith', role: 'Plumber', phoneNumber: '+1987654321' },
    { id: '3', name: 'Bob Johnson', role: 'Cleaner', phoneNumber: '+1122334455' },
    { id: '4', name: 'Alice Williams', role: 'Electrician', phoneNumber: '+1555666777' },
    { id: '5', name: 'David Brown', role: 'Plumber', phoneNumber: '+1444555666' },
    { id: '6', name: 'Emily Davis', role: 'Cleaner', phoneNumber: '+1333444555' },
    { id: '7', name: 'Michael Wilson', role: 'Electrician', phoneNumber: '+1222333444' },
    { id: '8', name: 'Sarah Miller', role: 'Plumber', phoneNumber: '+1111222333' },
    { id: '9', name: 'Chris Evans', role: 'Cleaner', phoneNumber: '+1000111222' },
    { id: '10', name: 'Jessica Green', role: 'Electrician', phoneNumber: '+1999888777' },
    { id: '11', name: 'Daniel White', role: 'Plumber', phoneNumber: '+1888777666' },
    { id: '12', name: 'Olivia Harris', role: 'Cleaner', phoneNumber: '+1777666555' },
    { id: '13', name: 'James Clark', role: 'Electrician', phoneNumber: '+1666555444' },
    { id: '14', name: 'Sophia Lewis', role: 'Plumber', phoneNumber: '+1555444333' },
    { id: '15', name: 'Robert King', role: 'Cleaner', phoneNumber: '+1444333222' },
    { id: '16', name: 'Maria Scott', role: 'Electrician', phoneNumber: '+1333222111' },
    { id: '17', name: 'Kevin Baker', role: 'Plumber', phoneNumber: '+1222111000' },
    { id: '18', name: 'Laura Adams', role: 'Cleaner', phoneNumber: '+1111000999' },
    { id: '19', name: 'Paul Nelson', role: 'Electrician', phoneNumber: '+1000999888' },
    { id: '20', name: 'Nicole Carter', role: 'Plumber', phoneNumber: '+1999888777' },
  ];

  const filteredVendors = vendors.filter(vendor =>
    roleFilter === 'All' || vendor.role === roleFilter
  );

  const handleSelectVendor = (vendor) => {
    setSelectedVendors((prevSelected) => {
      if (prevSelected.some((v) => v.id === vendor.id)) {
        return prevSelected.filter((v) => v.id !== vendor.id);
      } else {
        return [...prevSelected, vendor];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedVendors(filteredVendors);
  };

  const handleDeselectAll = () => {
    setSelectedVendors([]);
  };

  const handleSendMessage = () => {
    if (selectedVendors.length === 0 || !message) {
      setModalMessage('Please select at least one vendor and write a message.');
      return;
    }

    setIsSending(true);

    const phoneNumbers = selectedVendors.map((v) => v.phoneNumber.replace(/\D/g, '')).join(';'); // Changed to ';' for multiple recipients
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `sms:?body=${encodedMessage}`;
    // The SMS action is handled by the OS.
    // The following timeout is for demonstration of the loading state.
    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      setSelectedVendors([]);
    }, 2000);
  };

  const handleGenerateMessage = async () => {
    if (selectedVendors.length === 0 || !purpose) {
      setModalMessage('Please select at least one vendor and describe the message purpose.');
      return;
    }

    setIsGenerating(true);
    const vendorRoles = selectedVendors.map(v => v.role).join(', ');
    const userQuery = `Draft a concise and polite text message for a company administrator to send to a group of vendors. The vendors are: ${vendorRoles}. The purpose of the message is: ${purpose}. The message should be professional and clear.`;

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "google_search": {} }],
      systemInstruction: {
        parts: [{ text: "Act as a world-class professional administrator. Your task is to draft a text message for vendors that is clear, concise, and professional." }]
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setMessage(generatedText);
      } else {
        setModalMessage("Could not generate a message. Please try again.");
      }
    } catch (error) {
      setModalMessage("An error occurred while generating the message. Please try again later.");
      console.error('API Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8 flex flex-col items-center">
      <Modal message={modalMessage} onClose={() => setModalMessage('')} />
      <div className="max-w-4xl w-full space-y-8 p-6 bg-white rounded-lg shadow-xl">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-md">
            Vendor Communication Dashboard
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Select vendors and send a group message directly from your phone.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-600">Select Vendors</h2>
          <div className="flex flex-wrap items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Filter by Role:</span>
            <Button
              onClick={() => setRoleFilter('All')}
              className={roleFilter === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}
            >
              All
            </Button>
            <Button
              onClick={() => setRoleFilter('Electrician')}
              className={roleFilter === 'Electrician' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}
            >
              Electrician
            </Button>
            <Button
              onClick={() => setRoleFilter('Plumber')}
              className={roleFilter === 'Plumber' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}
            >
              Plumber
            </Button>
            <Button
              onClick={() => setRoleFilter('Cleaner')}
              className={roleFilter === 'Cleaner' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}
            >
              Cleaner
            </Button>
            <Button
              onClick={handleSelectAll}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Select All
            </Button>
            {selectedVendors.length > 0 && (
              <Button
                onClick={handleDeselectAll}
                className="bg-gray-400 text-white hover:bg-gray-500"
              >
                Deselect All
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh] p-1">
            {filteredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={selectedVendors.some((v) => v.id === vendor.id)}
                onSelect={handleSelectVendor}
              />
            ))}
          </div>
        </section>

        {selectedVendors.length > 0 && (
          <section className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-600">Compose Message</h2>
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                What is the purpose of this message?
              </label>
              <input
                id="purpose"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Requesting availability for a new job"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleGenerateMessage}
                loading={isGenerating}
                disabled={!purpose}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                <span className="flex items-center">✨ Suggest Message</span>
              </Button>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Drafted Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSendMessage}
                loading={isSending}
                disabled={!message}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Send Message
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
