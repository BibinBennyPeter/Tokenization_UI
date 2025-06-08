import React, { useState } from 'react';
import { MessageSquare, HelpCircle, FileText, Send, Plus, Search, ChevronDown, Star, Upload, X } from 'lucide-react';

const Support: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tickets');
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium',
    attachments: [] as File[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const tickets = [
    { id: 'TKT-001', subject: 'KYC Document Verification Issue', category: 'KYC', status: 'open', created: '2024-03-15', updated: '2024-03-16' },
    { id: 'TKT-002', subject: 'Investment Returns Calculation', category: 'Investment', status: 'resolved', created: '2024-03-10', updated: '2024-03-12' },
    { id: 'TKT-003', subject: 'Login Issues on Mobile App', category: 'Technical', status: 'pending', created: '2024-03-08', updated: '2024-03-14' }
  ];

  const faqs = [
    {
      category: 'KYC & Verification',
      questions: [
        { q: 'How long does KYC verification take?', a: 'KYC verification typically takes 2-3 business days after all documents are submitted.' },
        { q: 'What documents are required for KYC?', a: 'You need Aadhar Card (front and back), PAN Card, passport photo, and bank account details.' },
        { q: 'Can I invest before KYC completion?', a: 'No, KYC must be completed before you can make any investments on the platform.' }
      ]
    },
    {
      category: 'Investment',
      questions: [
        { q: 'What is the minimum investment amount?', a: 'The minimum investment amount is ₹10,000 per property token.' },
        { q: 'How are returns calculated?', a: 'Returns are calculated based on rental income and property appreciation, distributed quarterly.' },
        { q: 'Can I sell my tokens before maturity?', a: 'Yes, tokens can be traded on our secondary marketplace subject to liquidity.' }
      ]
    },
    {
      category: 'Smart Contracts',
      questions: [
        { q: 'How do smart contracts work?', a: 'Smart contracts automatically execute transactions and distribute returns based on predefined conditions.' },
        { q: 'Are smart contracts audited?', a: 'Yes, all our smart contracts are audited by third-party security firms before deployment.' },
        { q: 'What blockchain do you use?', a: 'We use Ethereum blockchain for our tokenization and smart contract infrastructure.' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'open': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', text: 'Open' },
      'pending': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', text: 'Pending' },
      'resolved': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', text: 'Resolved' },
      'closed': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', text: 'Closed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setTicketForm(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setTicketForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.category || !ticketForm.subject || !ticketForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Support ticket submitted successfully! You will receive a confirmation email shortly.');
    setTicketForm({
      category: '',
      subject: '',
      description: '',
      priority: 'medium',
      attachments: []
    });
    setActiveSection('tickets');
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    alert('Thank you for your feedback! We appreciate your input.');
    setRating(0);
    setFeedback('');
  };

  const launchChatbot = () => {
    alert('AI Chatbot would launch here - integrating with customer support system');
  };

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Tickets</h3>
        <button 
          onClick={() => setActiveSection('new-ticket')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Ticket</span>
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{ticket.id}</span>
                {getStatusBadge(ticket.status)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Updated {ticket.updated}</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{ticket.subject}</h4>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Category: {ticket.category}</span>
              <span>Created: {ticket.created}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNewTicket = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => setActiveSection('tickets')}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Ticket</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select
              value={ticketForm.category}
              onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select category</option>
              <option value="kyc">KYC & Verification</option>
              <option value="investment">Investment</option>
              <option value="technical">Technical Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              value={ticketForm.priority}
              onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
            <input
              type="text"
              value={ticketForm.subject}
              onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Brief description of your issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea
              value={ticketForm.description}
              onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Provide detailed information about your issue"
            />
          </div>
        </div>
      </div>

      {/* File Attachments */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <input
            type="file"
            multiple
            onChange={handleFileAttachment}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload files or drag and drop</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">PDF, JPG, PNG, DOC (max 10MB each)</span>
          </label>
        </div>

        {ticketForm.attachments.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Attached Files:</p>
            {ticketForm.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={handleSubmitTicket}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Ticket</span>
        </button>
        <button 
          onClick={() => setActiveSection('tickets')}
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderFAQs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <h4 className="font-medium text-gray-900 dark:text-white">{category.category}</h4>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-600">
              {category.questions.map((faq, faqIndex) => (
                <details key={faqIndex} className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feedback & Suggestions</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rate Your Experience</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Share your thoughts, suggestions, or report issues..."
            />
          </div>

          <button 
            onClick={handleSubmitFeedback}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Feedback
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border dark:border-gray-700">
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Assistant Available</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Get instant answers to common questions with our AI-powered chatbot. Available 24/7 to help with your queries.
              </p>
              <button 
                onClick={launchChatbot}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Launch Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'tickets', label: 'My Tickets', icon: FileText },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {activeSection !== 'new-ticket' && (
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8" aria-label="Tabs">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {activeSection === 'tickets' && renderTickets()}
      {activeSection === 'new-ticket' && renderNewTicket()}
      {activeSection === 'faqs' && renderFAQs()}
      {activeSection === 'feedback' && renderFeedback()}
    </div>
  );
};

export default Support;