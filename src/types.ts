export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: "Issued" | "Available";  
}
