import { useState, useRef, useEffect } from "react";
// import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  thinking?: string;
  timestamp: Date;
}

interface GeneratedContent {
  id: string;
  type: "image" | "video";
  title: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// Placeholder component with Picsum Photos
const ImagePlaceholder = ({ 
  title,
  width,
  height,
  seed
}: { 
  title: string;
  width: number;
  height: number;
  seed?: number;
}) => {
  // Use Picsum Photos with a seed for consistent images
  const imageId = seed || Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/id/${imageId}/${width}/${height}`;
    
  return (
    <div className="w-full h-full relative">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const StudioPage = () => {
  // Using projectId from URL params (commented out to avoid ESLint warning)
  // const { projectId } = useParams<{ projectId: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      content:
        'Please create a series of 8 illustrations titled "A Cat Around the World"',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      sender: "ai",
      content:
        "I see you'd like to add a peace dove to the New York illustration. Let me analyze the selected area and create an appropriate inpainting.",
      thinking:
        "Use the provided selected area as a mask to Inpaint a peace dove in the New York illustration, maintaining the Japanese watercolor style with fine linework and pastel palette",
      timestamp: new Date(),
    },
  ]);

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([
    {
      id: "1",
      type: "image",
      title: "Cat in New York",
      color: "#FFCC99",
      dimensions: {
        width: 600,
        height: 400
      }
    },
    {
      id: "2",
      type: "image",
      title: "Cat in Rome",
      color: "#99CCFF",
      dimensions: {
        width: 600,
        height: 400
      }
    },
    {
      id: "3",
      type: "image",
      title: "Cat at Taj Mahal",
      color: "#CCFF99",
      dimensions: {
        width: 600,
        height: 400
      }
    },
  ]);

  const [selectedContent, setSelectedContent] = useState<string>(
    generatedContent[0].id
  );
  const [isThinking, setIsThinking] = useState(false);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // If we're at the bottom (with a small buffer), enable auto-scroll
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;
    setShouldAutoScroll(isAtBottom);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newUserMessage]);
      setMessage("");

      // Simulate AI thinking and response
      setIsThinking(true);
      setTimeout(() => {
        const aiThinking =
          "Analyzing request to generate a new illustration based on the user prompt. Considering style consistency with existing cat illustrations...";

        setTimeout(() => {
          const newAiMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            content:
              "I'll create a new illustration of a cat in Sydney with the same watercolor style. Give me a moment to generate this for you.",
            thinking: aiThinking,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, newAiMessage]);
          setIsThinking(false);

          // Simulate adding a new generated image
          setTimeout(() => {
            const newContent: GeneratedContent = {
              id: (generatedContent.length + 1).toString(),
              type: "image",
              title: "Cat in Sydney",
              color: "#FF99CC", // Keeping color for backward compatibility
              dimensions: {
                width: 600,
                height: 400
              }
            };
            setGeneratedContent((prev) => [...prev, newContent]);
            setSelectedContent(newContent.id);
          }, 1500);
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left sidebar with logo */}
      <div className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-4">
        <div className="mb-8">
          <a href="/" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main content area - using grid layout instead of flex */}
      <div className="ml-16 grid grid-cols-3 w-[calc(100%-4rem)]">
        {/* Generated content display area - using 2 columns of the 3-column grid */}
        <div className="col-span-2 bg-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-4 gap-4">
              {generatedContent.map((content) => (
                <div
                  key={content.id}
                  className={`cursor-pointer rounded-lg overflow-hidden shadow-lg ${
                    selectedContent === content.id
                      ? "ring-4 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedContent(content.id)}
                >
                  <div className="w-full h-64 relative">
                    {content.type === "image" ? (
                      <div className="w-full h-full">
                        <ImagePlaceholder 
                          title={content.title}
                          width={content.dimensions.width}
                          height={content.dimensions.height}
                          seed={parseInt(content.id) + 100}
                        />
                        {/* Title overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <h3 className="text-white font-medium">{content.title}</h3>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="text-sm">Width: {content.dimensions.width}px</div>
                        <div className="text-sm">Height: {content.dimensions.height}px</div>
                        
                        {/* Title overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <h3 className="text-white font-medium">{content.title}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected content section removed */}
          </div>
        </div>

        {/* Chat area - taking up 1 column of the 3-column grid */}
        <div className="bg-white border-l border-gray-200 flex flex-col h-screen">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                <span>L</span>
              </div>
              <span className="ml-2 font-medium">Chat Studio</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Discord</span>
              <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                25%
              </span>
            </div>
          </div>

          {/* Scrollable message area with flex-1 to take available space */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-50 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "user" ? (
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
                    <p>{msg.content}</p>
                  </div>
                </div>
                
                {/* AI thinking section displayed full width - collapsible */}
                {msg.thinking && (
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
                            {msg.thinking}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Task completion indicator */}
            <div className="w-full py-4">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">The current task has been completed</span>
              </div>
            </div>
            
            {/* Image Analyzer section */}
            <div className="w-full mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <div className="font-medium">
                      Image Analyzer
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {isThinking && (
              <div>
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md rounded-lg p-4 bg-gray-50 text-gray-800 rounded-bl-none">
                    <div className="flex items-center mb-1">
                      <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">
                        L
                      </div>
                      <span className="ml-2 text-sm font-medium">Chat Studio</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed input area at the bottom */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draw a peace dove in this area"
                  className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                className="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
