import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';
import type { GeneratedContent } from '../types';

interface ProjectCardProps {
  project: GeneratedContent;
  className?: string;
}

const ProjectCard = ({ project, className = '' }: ProjectCardProps) => {
  return (
    <Link
      to={`/studio/${project.id}`}
      className={`block transform transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ${className}`}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
        <div className="relative" style={{ 
          paddingBottom: `${(project.dimensions.height / project.dimensions.width) * 100}%`
        }}>
          {project.type === "image" ? (
            <div className="absolute inset-0">
              <ImagePlaceholder 
                title={project.title}
                width={project.dimensions.width}
                height={project.dimensions.height}
                seed={parseInt(project.id) + 300}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
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
            </div>
          )}
          
          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-medium">{project.title}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mt-1">
            {project.type === "image" ? "Image" : "Video"} • {project.dimensions.width}×{project.dimensions.height}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
