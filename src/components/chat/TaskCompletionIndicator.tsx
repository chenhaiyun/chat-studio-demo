// TaskCompletionIndicator component
const TaskCompletionIndicator = () => {
  return (
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
  );
};

export default TaskCompletionIndicator;
