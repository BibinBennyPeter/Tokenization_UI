import React, { useState } from 'react';

type Ticket = {
  id: number;
  subject: string;
  message: string;
  response: string | null;
  status: 'Open' | 'Closed';
};

const mockTickets: Ticket[] = [
  {
    id: 1,
    subject: 'Unable to upload ownership proof',
    message: 'The upload form is giving an error.',
    response: 'Please ensure your file is under 10MB and in PDF format.',
    status: 'Closed',
  },
  {
    id: 2,
    subject: 'KYC rejected without reason',
    message: 'I received a rejection notice but no reason.',
    response: null,
    status: 'Open',
  },
];

const HelpSupport: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!subject || !message) {
      alert('Please enter both subject and message.');
      return;
    }

    alert('Support ticket submitted!');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h1>

      {/* Submit a Query */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit a Query or Issue</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              placeholder="Enter your query subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              rows={4}
              placeholder="Describe your issue or question"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </div>
      </div>

      {/* Past Tickets */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Past Tickets & Admin Responses</h2>
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="mb-4 border border-gray-200 rounded p-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-semibold">{ticket.subject}</span>
              <span className={ticket.status === 'Closed' ? 'text-green-600' : 'text-yellow-600'}>
                {ticket.status}
              </span>
            </div>
            <p className="mt-2 text-gray-800"><strong>Message:</strong> {ticket.message}</p>
            {ticket.response ? (
              <p className="mt-2 text-blue-800"><strong>Admin Response:</strong> {ticket.response}</p>
            ) : (
              <p className="mt-2 text-gray-500 italic">Awaiting admin response...</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Compliance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Compliance</h2>
        <p className="text-sm text-gray-700">
          For compliance-related concerns (e.g. KYC, ownership disputes, legal verification), please email us at{' '}
          <a href="mailto:compliance@landportal.example" className="text-blue-600 hover:underline">
            compliance@landportal.example
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
