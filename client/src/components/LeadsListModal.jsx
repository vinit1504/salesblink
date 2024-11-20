/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLists } from "../store/reactflow/reactFlowSlice"; // Ensure this path is correct
import { X } from "lucide-react";

const LeadsListModal = ({ onClose, onInsert }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLists, setSelectedListsState] = useState([]); // local state to hold selected lists
  const [lists] = useState([
    "sp3887804@gmail.com",
    "vinit15012003@gmail.com",
  ]);

  const dispatch = useDispatch(); // Redux dispatcher

  const handleAddList = (list) => {
    if (!selectedLists.includes(list)) {
      setSelectedListsState((prev) => [...prev, list]);
    }
  };

  const handleRemoveList = (list) => {
    setSelectedListsState((prev) => prev.filter((item) => item !== list));
  };

  const handleInsert = () => {
    // Dispatch to Redux store
    dispatch(setSelectedLists(selectedLists)); // Correct action dispatch
    console.log("Selected lists stored in Redux:", selectedLists);

    onClose(); // Close the modal
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-[900px] h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="p-6 border-b flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Leads from List(s)
              </h2>
              <p className="text-gray-600 mt-1">
                Connect multiple lists as source for this sequence.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select your List(s)</h3>
                <button className="text-blue-500 font-medium flex items-center bg-white border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50">
                  <span className="mr-2">New List</span>
                  <span className="text-xl">+</span>
                </button>
              </div>

              {/* Searchable Dropdown */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for a list..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                />
                <div className="border rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {lists
                    .filter((list) =>
                      list.toLowerCase().startsWith(searchTerm.toLowerCase())
                    )
                    .map((list) => (
                      <div
                        key={list}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleAddList(list)}
                      >
                        {list}
                      </div>
                    ))}
                </div>
              </div>

              {/* Selected Lists */}
              <div className="border rounded-lg p-2 min-h-[48px]">
                {selectedLists.map((list) => (
                  <div
                    key={list}
                    className="inline-flex items-center bg-gray-100 rounded-md px-3 py-1 m-1"
                  >
                    <span className="mr-2">{list}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveList(list)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleInsert}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsListModal;
