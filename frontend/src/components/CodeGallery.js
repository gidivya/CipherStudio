import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CodeGallery = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/code');
      setSnippets(response.data.snippets);
    } catch (error) {
      toast.error('Failed to load code snippets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Code Gallery</h1>
        
        {snippets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No code snippets available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <div key={snippet._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold mb-2">{snippet.title}</h3>
                <p className="text-gray-400 mb-4">{snippet.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-600 px-2 py-1 rounded">{snippet.language}</span>
                  <span className="text-gray-500">{new Date(snippet.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGallery;

