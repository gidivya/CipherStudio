import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            Welcome to <span className="text-blue-400">CipherStudio</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compile and execute code in multiple programming languages
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/editor"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Start Coding
            </Link>
            <Link
              to="/gallery"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              View Gallery
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Multi-Language Support</h3>
            <p className="text-gray-300">
              Write code in Python, C++, Java, C, and JavaScript
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-bold mb-2">Save & Share</h3>
            <p className="text-gray-300">
              Save your code snippets and share them with the community
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Fast Execution</h3>
            <p className="text-gray-300">
              Compile and execute your code in real-time with instant results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

