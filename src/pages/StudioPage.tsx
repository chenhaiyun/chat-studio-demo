import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { Message, GeneratedContent } from "../types";
import ImagePlaceholder from "../components/ImagePlaceholder";
import ChatMessage from "../components/chat/ChatMessage";
import ThinkingIndicator from "../components/chat/ThinkingIndicator";
import TaskCompletionIndicator from "../components/chat/TaskCompletionIndicator";
import ImageAnalyzer from "../components/chat/ImageAnalyzer";
// import { useParams } from 'react-router-dom';

const StudioPage = () => {
  // Using projectId from URL params (commented out to avoid ESLint warning)
  // const { projectId } = useParams<{ projectId: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      content:
        'Please create a series of 8 illustrations titled "A Cat Around the World"',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      sender: "ai",
      content:
        "I'll create a series of 8 illustrations showing a cat visiting famous landmarks around the world. What style would you prefer for these illustrations?",
      timestamp: new Date(Date.now() - 90000),
    },
    {
      id: "3",
      sender: "user",
      content: "I'd like a Japanese watercolor style with fine linework and pastel colors.",
      timestamp: new Date(Date.now() - 60000),
      image: {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYwZjUiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjBmNWZmIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNDgwIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjxwYXRoIGQ9Ik0yMDAgMjUwQzI1MCAxODAgMzAwIDIwMCAzNTAgMjUwQzQwMCAzMDAgNDUwIDI4MCA1MDAgMjUwIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjUwIiBmaWxsPSIjZmNkNWU1IiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIgLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIyMDAiIHI9IjMwIiBmaWxsPSIjZDVlNWZjIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIgLz48dGV4dCB4PSIyMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2Ij5XYXRlcmNvbG9yIFN0eWxlIFJlZmVyZW5jZTwvdGV4dD48L3N2Zz4=",
        name: "watercolor_style_reference.svg",
        size: 1024
      }
    },
    {
      id: "4",
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
        width: 640,
        height: 480
      }
    },
    {
      id: "2",
      type: "image",
      title: "Cat in Rome",
      color: "#99CCFF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "3",
      type: "image",
      title: "Cat at Taj Mahal",
      color: "#CCFF99",
      dimensions: {
        width: 640,
        height: 480
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isThinking]);

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleImageClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedImage) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: message,
        timestamp: new Date(),
        ...(selectedImage && imagePreview ? {
          image: {
            url: imagePreview,
            name: selectedImage.name,
            size: selectedImage.size
          }
        } : {})
      };
      setMessages([...messages, newUserMessage]);
      setMessage("");
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

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
                width: 640,
                height: 480
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
            {/* Render all messages */}
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Task completion indicator */}
            <TaskCompletionIndicator />
            
            {/* Image Analyzer section */}
            <ImageAnalyzer />
            
            {/* Thinking indicator */}
            {isThinking && <ThinkingIndicator />}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed input area at the bottom */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {/* Image preview area */}
            {imagePreview && (
              <div className="mb-3 relative">
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-20 rounded-lg border border-gray-300"
                  />
                  <button 
                    onClick={handleCancelImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {selectedImage && (
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedImage.name} ({(selectedImage.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
            )}
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
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
                  onClick={handleImageClick}
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
