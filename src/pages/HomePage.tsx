import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import type { GeneratedContent } from "../types";

// Alias GeneratedContent as ProjectCard for backward compatibility
type ProjectCard = GeneratedContent;

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() || selectedImage) {
      // In a real app, this would create a new project and redirect to the studio page
      console.log("Creating project with prompt:", prompt);
      if (selectedImage) {
        console.log("With attached image:", selectedImage.name);
      }
      window.location.href = `/studio/${Date.now()}`;
      
      // Reset form
      setPrompt("");
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
            {/* Image preview area */}
            {imagePreview && (
              <div className="mb-3 max-w-2xl mx-auto">
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-20 rounded-lg border border-gray-300"
                  />
                  <button 
                    type="button"
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
                  onClick={handleImageClick}
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
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
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
