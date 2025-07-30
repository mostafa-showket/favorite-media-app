import { useState, useEffect } from "react";
import { GetMedia, CreateMedia } from "./actions";
import type { Media } from "./types/media";
import "./App.css";

function App() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await GetMedia();

      if (response.success && response.data) {
        setMedia(response.data);
      } else {
        setError(response.error || "Failed to fetch media");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error in fetchMedia:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMedia = async () => {
    const sampleMedia: Omit<Media, "id" | "createdAt"> = {
      title: "Sample Movie",
      type: "Movie",
      genre: "Action",
      director: "John Doe",
      budget: "1000000",
      location: "Hollywood",
      duration: "120 minutes",
      yearOrTime: "2024",
      image: "https://via.placeholder.com/300x200",
    };

    try {
      const response = await CreateMedia(sampleMedia);

      if (response.success && response.data) {
        setMedia((prev) => [response.data!, ...prev]);
        alert("Media created successfully!");
      } else {
        alert(response.error || "Failed to create media");
      }
    } catch (err) {
      alert("An unexpected error occurred");
      console.error("Error in handleCreateMedia:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading media...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button
            onClick={fetchMedia}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Favorite Media App
          </h1>
          <button
            onClick={handleCreateMedia}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Sample Media
          </button>
        </div>

        {media.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">No media found</div>
            <div className="text-gray-400 mt-2">
              Click "Add Sample Media" to get started
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {item.type}
                    </p>
                    <p>
                      <span className="font-medium">Genre:</span> {item.genre}
                    </p>
                    <p>
                      <span className="font-medium">Director:</span>{" "}
                      {item.director}
                    </p>
                    <p>
                      <span className="font-medium">Budget:</span> {item.budget}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {item.location}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {item.duration}
                    </p>
                    <p>
                      <span className="font-medium">Year/Time:</span>{" "}
                      {item.yearOrTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

