import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailTemplate, setSendEmailAs } from './../store/emailFollowup/emailfollowup'; // Import the actions

const EmailStatus = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const { emailTemplate, sendEmailAs } = useSelector((state) => state.emailFollowus);

  // Dummy Data
  const emailTemplates = ['Template 1', 'Template 2', 'Template 3'];
  const sendEmailAsOptions = ['RE: Follow Up', 'RE: Inquiry', 'RE: Thanks'];

  // Local state to track if the button should be enabled
  const [canInsert, setCanInsert] = useState(false);

  // Handle Template Selection Change
  const handleEmailTemplateChange = (event) => {
    dispatch(setEmailTemplate(event.target.value));
  };

  // Handle Send Email As Change
  const handleSendEmailAsChange = (event) => {
    dispatch(setSendEmailAs(event.target.value));
  };

  // Effect to check if both fields are filled
  useEffect(() => {
    if (emailTemplate && sendEmailAs) {
      setCanInsert(true); // Enable button when both fields are filled
    } else {
      setCanInsert(false); // Disable button if any field is empty
    }
  }, [emailTemplate, sendEmailAs]);

  // Handle Insert Button Click
  const handleInsertClick = () => {
    // Dispatch to store in Redux
    console.log('Inserting Email Template:', emailTemplate, 'Send Email As:', sendEmailAs);
    // Here you can dispatch any other necessary actions or make API calls if needed
    onClose(); // Close the modal after insert
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg h-[90vh]">
        {/* Header */}
        <div className="flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Cold Email</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-600">Send an email to a lead.</p>

          <div className="space-y-4">
            {/* Email Template Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Email Template</label>
                <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                  <span>New Template</span>
                  <span className="text-lg">⊕</span>
                </button>
              </div>
              <div className="relative">
                <select
                  value={emailTemplate}
                  onChange={handleEmailTemplateChange}
                  className="w-full p-2 border rounded-lg appearance-none bg-white pr-8"
                >
                  <option>Search for an Email Template</option>
                  {emailTemplates.map((template, index) => (
                    <option key={index} value={template}>
                      {template}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            {/* Send Email As Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Send Email As</label>
              <div className="relative">
                <select
                  value={sendEmailAs}
                  onChange={handleSendEmailAsChange}
                  className="w-full p-2 border rounded-lg appearance-none bg-white pr-8"
                >
                  {sendEmailAsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            {/* Information Message */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600 italic">
              <p>Since you are sending the email as "{sendEmailAs}",</p>
              <p>Subject Line of this template will be ignored & follow-up email will be sent in same thread as a reply to the last email.</p>
            </div>

            {/* Insert Button */}
            {canInsert && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleInsertClick}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Insert
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStatus;
