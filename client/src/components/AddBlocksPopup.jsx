/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { X } from "lucide-react";
import EmailTemplateModal from "./EmailTemplateModal"; // Update the path as needed

const PopupModal = ({ isOpen, onClose, children, title, subtitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {title}
                {subtitle && (
                  <span className="inline-block ml-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                    </svg>
                  </span>
                )}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const AddBlocksPopup = ({ isOpen, onClose }) => {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const handleColdEmailClick = () => {
    setEmailModalOpen(true);
    onClose(); // Close the AddBlocksPopup when opening EmailTemplateModal
  };

  const blocks = [
    {
      id: "cold-email",
      title: "Cold Email",
      description: "Send an email to a lead.",
      icon: (
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      ),
      action: handleColdEmailClick,
    },
    {
      id: "task",
      title: "Task",
      description: "Schedule a manual task.",
      icon: (
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <>
      <PopupModal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Blocks"
        subtitle="Click on a block to configure and add it in sequence."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blocks.map((block) => (
            <button
              key={block.id}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-start gap-4 transition-colors"
              onClick={block.action}
            >
              {block.icon}
              <div>
                <h3 className="font-medium text-gray-900">{block.title}</h3>
                <p className="text-sm text-gray-600">{block.description}</p>
              </div>
            </button>
          ))}
        </div>
      </PopupModal>

      {/* EmailTemplateModal */}
      <EmailTemplateModal
        isOpen={isEmailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
    </>
  );
};

export default AddBlocksPopup;
