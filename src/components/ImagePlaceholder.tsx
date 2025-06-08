interface ImagePlaceholderProps {
  title: string;
  width: number;
  height: number;
  seed?: number;
}

// Placeholder component with Picsum Photos
const ImagePlaceholder = ({ 
  title,
  width,
  height,
  seed
}: ImagePlaceholderProps) => {
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

export default ImagePlaceholder;
