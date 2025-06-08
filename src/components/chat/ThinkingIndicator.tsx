// ThinkingIndicator component for showing AI is thinking
const ThinkingIndicator = () => {
  return (
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
  );
};

export default ThinkingIndicator;
