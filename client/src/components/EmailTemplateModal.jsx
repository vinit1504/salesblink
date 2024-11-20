/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailTemplate } from './../store/emailtemp/emailTemplate'; // Import the setEmailTemplate action
import { X, Plus } from 'lucide-react';

const EmailTemplateModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { templateName } = useSelector((state) => state.emailList); // Get the templateName from Redux
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Define the available templates
  const templates = [
    { id: 1, name: 'Sample Template (added by SalesBlink)' },
    { id: 2, name: 'Sample Template - Follow Up (added by SalesBlink)' }
  ];

  // Function to handle selecting a template
  const handleTemplateSelect = (template) => {
    //   console.log('45789');
      
      console.log(`Selected: ${template.name}`);
    dispatch(setEmailTemplate(template.name)); // Store the template name in Redux
  };

  // Function to insert the selected template
  const handleInsert = () => {
    if (templateName) {
    //   alert(`Inserted: ${templateName}`);
      onClose(); // Close the modal after inserting the template
    }
  };

  // Filter the templates based on the search term
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Cold Email</h2>
            <p className="text-sm text-gray-600 mt-1">Send an email to a lead.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Email Template
              </label>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-md hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for an Email Template"
                value={templateName || searchTerm} // Use the templateName from Redux or searchTerm for the input value
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  dispatch(setEmailTemplate('')); // Reset template name on search input
                }}
              />
            </div>

            <div className="mt-2 border rounded-md divide-y">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)} // Select the template on click
                >
                  <p className="text-sm text-gray-700">{template.name}</p>
                </div>
              ))}
            </div>

            {/* Display Insert button if a template is selected */}
            {templateName && (
              <button
                onClick={handleInsert}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Insert
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateModal;
