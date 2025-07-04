export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  thinking?: string;
  timestamp: Date;
  image?: {
    url: string;
    name: string;
    size: number;
  };
}

export interface GeneratedContent {
  id: string;
  type: "image" | "video";
  title: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
  };
}
