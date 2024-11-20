/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTime } from "./../store/time/time"; // Import the action

const WaitConfigDialog = ({ isOpen, onClose }) => {
  const [duration, setDuration] = useState('');
  const [waitType, setWaitType] = useState('Days');
  const dispatch = useDispatch(); // Access the Redux dispatch function

  if (!isOpen) return null;

  const handleInsert = () => {
    // Dispatch the action to store the time in Redux
    dispatch(setTime({ waitDuration: duration, waitType }));
    onClose(); // Close the dialog after storing the data
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Wait</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">Add a delay between blocks.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wait For
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter wait duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wait Type
              </label>
              <select
                className="w-full p-2 border rounded-md bg-white"
                value={waitType}
                onChange={(e) => setWaitType(e.target.value)}
              >
                <option>Days</option>
                <option>Hours</option>
                <option>Minutes</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleInsert} // Call the function to store data
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitConfigDialog;
