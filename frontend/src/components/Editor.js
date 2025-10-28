import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    // Set default code based on language
    const defaultCodes = {
      python: '# Welcome to CipherStudio\nprint("Hello, World!")',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      javascript: 'console.log("Hello, World!");'
    };
    
    if (!code || code === defaultCodes[language]) {
      setCode(defaultCodes[language] || '');
    }
  }, [language]);

  const handleCompile = async () => {
    setLoading(true);
    setOutput('');
    
    try {
      const response = await axios.post(API_ENDPOINTS.COMPILE.EXECUTE, {
        code,
        language,
        input
      });
      
      if (response.data.status === 'success') {
        setOutput(response.data.output);
        toast.success('Code executed successfully!');
      } else {
        setOutput(`Error: ${response.data.error}`);
        toast.error('Execution failed!');
      }
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
      toast.error('Failed to execute code!');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToGallery = async () => {
    if (!user) {
      toast.error('Please login to save code snippets');
      return;
    }

    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_ENDPOINTS.CODE.BASE, {
        title,
        description,
        code,
        language,
        isPublic
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.success('Code snippet saved successfully!');
      setShowSaveForm(false);
      setTitle('');
      setDescription('');
      setIsPublic(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save code snippet');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Code Editor</h1>
        
        {/* Language Selection */}
        <div className="mb-4">
          <label className="mr-2">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {/* Code Editor */}
        <div className="mb-4 border border-gray-700 rounded">
          <Editor
            height="500px"
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Input Section */}
        <div className="mb-4">
          <label className="block mb-2">Input (Optional):</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="3"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
            placeholder="Enter input here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-4 flex gap-4">
          <button
            onClick={handleCompile}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>
          
          {user && (
            <button
              onClick={() => setShowSaveForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              Save to Gallery
            </button>
          )}
        </div>

        {/* Save Form Modal */}
        {showSaveForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Save Code Snippet</h2>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter snippet title"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter snippet description"
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Make this snippet public</span>
                </label>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleSaveToGallery}
                  disabled={saving || !title}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setShowSaveForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Output Section */}
        <div>
          <label className="block mb-2">Output:</label>
          <pre className="bg-gray-800 text-white px-4 py-3 rounded border border-gray-600 min-h-[100px] overflow-x-auto">
            {output || 'Output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

