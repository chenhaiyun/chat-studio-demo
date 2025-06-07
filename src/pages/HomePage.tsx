import { useState } from "react";
import { Link } from "react-router-dom";

// Placeholder components with colored backgrounds
const PlaceholderDiv = ({ 
  color, 
  title 
}: { 
  color: string; 
  title: string;
}) => {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: color }}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm mt-2">Width: 100%</div>
      <div className="text-sm">Height: 100%</div>
    </div>
  );
};

interface ProjectCard {
  id: string;
  title: string;
  color: string;
}

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [projects] = useState<ProjectCard[]>([
    {
      id: "1",
      title: "Abstract Art",
      color: "#FF5733",
    },
    {
      id: "2",
      title: "Landscape",
      color: "#33FF57",
    },
    {
      id: "3",
      title: "Portrait",
      color: "#3357FF",
    },
    {
      id: "4",
      title: "Animation",
      color: "#FF33A8",
    },
    {
      id: "5",
      title: "Video",
      color: "#33A8FF",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // In a real app, this would create a new project and redirect to the studio page
      console.log("Creating project with prompt:", prompt);
      window.location.href = `/studio/${Date.now()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="ml-16 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 mt-12">Good Night, User</h1>
          <p className="text-xl text-gray-600 mb-8">
            What are we designing today?
          </p>

          <form onSubmit={handleSubmit} className="mb-16">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Please enter your design requirements"
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
              </div>
            </div>
          </form>

          <div>
            <h2 className="text-2xl font-bold mb-6">Created With Lovart</h2>
            <div className="flex overflow-x-auto pb-6 space-x-6">
              {projects.map((project) => (
                <Link
                  to={`/studio/${project.id}`}
                  key={project.id}
                  className="relative group flex-shrink-0"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg w-64 h-80">
                    <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                      <PlaceholderDiv color={project.color} title={project.title} />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-medium">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
