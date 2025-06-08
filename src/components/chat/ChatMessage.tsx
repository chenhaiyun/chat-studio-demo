import type { Message } from '../../types';

// ChatMessage component for rendering individual messages
const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div>
      <div
        className={`flex ${
          message.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
            message.sender === "user"
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-50 text-gray-800 rounded-bl-none"
          }`}
        >
          {message.sender === "user" ? (
            <div className="flex items-center mb-1">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                U
              </div>
              <span className="ml-2 text-sm font-medium">wzglyay</span>
            </div>
          ) : (
            <div className="flex items-center mb-1">
              <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">
                L
              </div>
              <span className="ml-2 text-sm font-medium">Chat Studio</span>
            </div>
          )}
          <p>{message.content}</p>
          
          {/* Display image if present */}
          {message.image && (
            <div className="mt-2">
              <div className="relative">
                <img 
                  src={message.image.url} 
                  alt={message.image.name}
                  className="max-w-full rounded-lg border border-gray-200"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {(message.image.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {message.image.name}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* AI thinking section displayed full width - collapsible */}
      {message.thinking && (
        <div className="w-full mt-4 mb-6">
          <div className="bg-amber-50 rounded-lg text-sm text-gray-700">
            {/* Smart Plan header - collapsible */}
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <div className="font-medium text-orange-500">
                  Smart Plan
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Smart Plan content */}
            <div className="px-4 pb-4">
              {/* Tool items */}
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-orange-500 font-medium">Outpaint tool</span>
                </div>
                <div className="ml-6 pl-2 border-l-2 border-orange-200">
                  {message.thinking}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
