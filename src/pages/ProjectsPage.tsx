import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import type { GeneratedContent } from "../types";

const ProjectsPage = () => {
  // Sample projects data - in a real app, this would come from an API or database
  const [projects] = useState<GeneratedContent[]>([
    {
      id: "1",
      title: "Abstract Art Collection",
      type: "image",
      color: "#FF5733",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "2",
      title: "Mountain Landscapes",
      type: "image",
      color: "#33FF57",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "3",
      title: "Portrait Series",
      type: "image",
      color: "#3357FF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "4",
      title: "Urban Animation",
      type: "image",
      color: "#FF33A8",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "5",
      title: "Nature Documentary",
      type: "video",
      color: "#33A8FF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "6",
      title: "Futuristic Cityscape",
      type: "image",
      color: "#FFCC33",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "7",
      title: "Ocean Waves",
      type: "video",
      color: "#33CCFF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "8",
      title: "Desert Sunset",
      type: "image",
      color: "#FF9966",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "9",
      title: "Wildlife Photography",
      type: "image",
      color: "#66FF99",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "10",
      title: "Space Exploration",
      type: "image",
      color: "#9966FF",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "11",
      title: "Architectural Designs",
      type: "image",
      color: "#FF6666",
      dimensions: {
        width: 640,
        height: 480
      }
    },
    {
      id: "12",
      title: "Food Photography",
      type: "image",
      color: "#FFCC99",
      dimensions: {
        width: 640,
        height: 480
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Main content */}
      <div className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All Projects</h1>
            <Link 
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Project
            </Link>
          </div>

          {/* Grid layout with exactly 5 items per row */}
          <div className="grid grid-cols-5 gap-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
