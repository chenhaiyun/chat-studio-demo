import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import type { GeneratedContent } from "../types";

// Alias GeneratedContent as ProjectCard for backward compatibility
type ProjectCard = GeneratedContent;

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [projects] = useState<ProjectCard[]>([
    {
      id: "1",
      title: "Abstract Art",
      type: "image",
      color: "#FF5733",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "2",
      title: "Landscape",
      type: "image",
      color: "#33FF57",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "3",
      title: "Portrait",
      type: "image",
      color: "#3357FF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "4",
      title: "Animation",
      type: "image",
      color: "#FF33A8",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "5",
      title: "Video",
      type: "video",
      color: "#33A8FF",
      dimensions: {
        width: 640,
        height: 480
      }
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Created With Chat Studio</h2>
              <Link 
                to="/projects" 
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                View all projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="flex overflow-x-auto pb-6 space-x-6">
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-64">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
