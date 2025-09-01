import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import Badge from '../components/ui/Badge';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Thanks for the quick response! The issue has been resolved.',
    timestamp: '2 min ago',
    unread: 0,
    avatar: '👩‍💼',
    status: 'online'
  },
  {
    id: 2,
    name: 'Mike Chen',
    lastMessage: 'Could you please help me with the integration setup?',
    timestamp: '15 min ago',
    unread: 3,
    avatar: '👨‍💻',
    status: 'away'
  },
  {
    id: 3,
    name: 'Emily Davis',
    lastMessage: 'The new feature looks amazing! Great work team.',
    timestamp: '1 hour ago',
    unread: 0,
    avatar: '👩‍🎨',
    status: 'offline'
  },
  {
    id: 4,
    name: 'Alex Thompson',
    lastMessage: 'When will the next update be available?',
    timestamp: '2 hours ago',
    unread: 1,
    avatar: '👨‍🔬',
    status: 'online'
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    lastMessage: 'Perfect! Everything is working as expected now.',
    timestamp: '3 hours ago',
    unread: 0,
    avatar: '👩‍⚕️',
    status: 'busy'
  }
];

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: 'Hi there! I\'m having trouble with the dashboard loading. It seems to be stuck on the loading screen.',
    timestamp: '10:30 AM',
    isMe: false
  },
  {
    id: 2,
    sender: 'Me',
    content: 'Hi Sarah! I\'m sorry to hear about the loading issue. Let me help you troubleshoot this. Can you please clear your browser cache and try again?',
    timestamp: '10:32 AM',
    isMe: true
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: 'I tried clearing the cache but it\'s still not working. Should I try a different browser?',
    timestamp: '10:35 AM',
    isMe: false
  },
  {
    id: 4,
    sender: 'Me',
    content: 'Yes, please try using Chrome or Firefox. Also, make sure you\'re using the latest version. If the issue persists, I\'ll escalate this to our technical team.',
    timestamp: '10:37 AM',
    isMe: true
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    content: 'Thanks for the quick response! The issue has been resolved. It was indeed a browser compatibility issue.',
    timestamp: '10:45 AM',
    isMe: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-nexus-success';
      case 'away': return 'bg-nexus-warning';
      case 'busy': return 'bg-nexus-error';
      default: return 'bg-gray-400';
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Messages</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Communicate with your team and customers</p>
              </div>
            </div>
            <button className="btn-nexus-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>New Message</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedConversation === conversation.id ? 'bg-nexus-primary/10 border-r-2 border-r-nexus-primary' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg">
                      {conversation.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(conversation.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {conversation.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.timestamp}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge variant="error">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg">
                        {selectedConv.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(selectedConv.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{selectedConv.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-nexus-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <PhoneIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-nexus-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <VideoCameraIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm lg:max-w-md xl:max-w-lg ${
                      message.isMe 
                        ? 'bg-nexus-primary text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                    } rounded-lg p-3 shadow-sm`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.isMe ? 'text-nexus-primary-light' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-nexus-primary focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 bg-nexus-primary text-white rounded-lg hover:bg-nexus-primary/90 transition-colors">
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No conversation selected</h3>
                <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}