/* eslint-disable no-unused-vars */
import {
  ArrowDownUp,
  ChartColumnDecreasing,
  ChevronDown,
  Rocket,
  RotateCcw,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import ReactFlows from "./../components/ReactFlows";

const Sequence = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Editable Label");
  const [tempText, setTempText] = useState(text);

  const handleEditClick = () => {
    setTempText(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(tempText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex-row flex items-center gap-3 justify-between mt-10 mx-auto w-11/12">
        <div className="flex items-center gap-2 p-2 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-36"
            />
          ) : (
            <span className="flex gap-10 flex-row text-lg font-medium w-36">
              {text}
            </span>
          )}

          {isEditing ? (
            <>
              <FaCheck
                onClick={handleSave}
                className="text-green-500 text-xl cursor-pointer"
                title="Save"
              />
              <FaTimes
                onClick={handleCancel}
                className="text-red-500 text-xl cursor-pointer"
                title="Cancel"
              />
            </>
          ) : (
            <>
              <FaEdit
                onClick={handleEditClick}
                className="text-blue-500 text-xl cursor-pointer"
                title="Edit"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <RotateCcw className="w-8 h-8 text-red-500 border-2 border-red-500 p-1 rounded-md hover:text-red-700 hover:border-red-700 transition-all duration-300" />
          <ArrowDownUp className="w-8 h-8 text-purple-500 border-2 border-purple-500 p-1 rounded-md hover:text-purple-700 hover:border-purple-700 transition-all duration-300" />
          <ChartColumnDecreasing className="w-8 h-8 text-blue-500 border-2 border-blue-500 p-1 rounded-md hover:text-blue-700 hover:border-blue-700 transition-all duration-300" />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            <span className="font-semibold">Save & Schedule</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-10 w-11/12 mx-auto" >
        <ReactFlows />
      </div>
    </div>
  );
};

export default Sequence;
