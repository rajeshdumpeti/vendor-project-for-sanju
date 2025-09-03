import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/Button.jsx';
import Modal from './components/Modal.jsx';
import VendorCard from './components/VendorCard.jsx';
import vendors from './data/vendors.js';

const App = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

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
    const phoneNumbers = selectedVendors.map((v) => v.phoneNumber).join(',');
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `sms:${phoneNumbers}?body=${encodedMessage}`;

    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      setSelectedVendors([]);
    }, 2000);
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
            <div className="flex flex-wrap gap-2">
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
            </div>
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
                className={!message ? "bg-slate-200" : "bg-indigo-600 text-white hover:bg-indigo-700"}
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