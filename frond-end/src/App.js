import React, { useState } from 'react';
import axios from 'axios';
import logo from "./logo.png"
axios.defaults.baseURL = 'http://localhost:3000';
const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) return; // Don't submit an empty form

    setLoading(true);

    try {
      const response = await axios.get('/ask', {
        params: {
          question: question,
        },
      });

      const result = response.data;
      setAnswer(result.text);
    } catch (error) {
      console.error(error);
      setAnswer('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-16 justify-center items-center min-h-screen bg-gray-900">
  <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-gray-800">
    <img src={logo} alt="Logo" className="w-60 h-60 mx-auto" />
    <h1 className="text-white text-3xl text-center mb-5">Cybersecurity Course Helper</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="w-full p-4 mb-4 rounded-md text-white bg-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 text-2xl bg-blue-900 text-blue-200 rounded-md focus:outline-none"
      >
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="animate-spin h-8 w-8 text-white inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
            />
          </svg>
        ) : (
          'Ask'
        )}
      </button>
    </form>
    {answer ? (
      <div className="mt-4 p-4 rounded-lg bg-gray-700">
        <span className="text-gray-100 text-xl">Answer:</span>
        <p className="text-gray-100">{answer}</p>
      </div>
    ) : (
      <div className="mt-4 p-4 rounded-lg bg-gray-700">
        <span className="text-gray-100 text-xl">Warning!</span>
        <p className="text-gray-100 whitespace-break-spaces">
          This tool is here to aid your memory on vital cybersecurity course material, not to
          unleash your inner cheat-master...
          <br />
          Remember, relying on cheating won't magically transform you into a cybersecurity expert.
          Trustworthiness and expertise come from honest dedication and hard work. Embrace the
          learning journey, and let your cybersecurity skills shine like a pro! Remember,
          shortcuts won't hack it in the real world.
        </p>
      </div>
    )}
    <div className='pt-2 '>
    <a href="https://ko-fi.com/N4N6MEFGD" target="_blank" className=''>
      <img
        height={36}
        style={{ border: 0, height: 36 }}
        src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
        border={0}
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
    </div>

  </div>
  <div className="text-gray-400 mt-8">
    <p className="text-center">Made by Youssef Mahboub</p>
    <div className="flex justify-center mt-2">
      <a
        href="https://github.com/youssefmahboub"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 1.99c-5.514 0-10 4.486-10 10 0 4.415 2.871 8.15 6.84 9.49.5.092.68-.217.68-.482v-1.79c-2.782.607-3.37-1.34-3.37-1.34-.455-1.154-1.11-1.464-1.11-1.464-.908-.62.07-.608.07-.608 1.004.07 1.53 1.03 1.53 1.03.892 1.52 2.343 1.082 2.91.83.093-.644.35-1.082.635-1.332-2.22-.255-4.555-1.11-4.555-4.936 0-1.09.38-1.98 1.03-2.68-.103-.256-.448-1.274.097-2.655 0 0 .84-.27 2.75 1.03.8-.223 1.65-.335 2.5-.338.85.003 1.7.115 2.5.338 1.91-1.3 2.75-1.03 2.75-1.03.545 1.38.2 2.4.1 2.655.64.7 1.03 1.587 1.03 2.68 0 3.838-2.34 4.675-4.57 4.92.36.31.68.918.68 1.846v2.73c0 .265.18.574.69.48 3.963-1.34 6.832-5.075 6.832-9.49 0-5.514-4.486-10-10-10z"
          />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/yssfmahboub/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          stroke="none"
          className="h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
      </a>
      <a
        href="https://twitter.com/yssfmahboub"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M23 4.18c-.84.37-1.74.62-2.68.73.96-.57 1.7-1.48 2.04-2.55-.9.53-1.9.92-2.96 1.13-.84-.9-2.03-1.46-3.35-1.46-2.53 0-4.58 2.05-4.58 4.58 0 .36.04.72.13 1.07-3.8-.19-7.16-2.02-9.42-4.79-.39.66-.61 1.43-.61 2.25 0 1.58.8 2.97 2.01 3.78-.74-.02-1.44-.23-2.05-.57v.06c0 2.21 1.57 4.06 3.65 4.48-.38.1-.78.15-1.19.15-.29 0-.57-.03-.85-.08.57 1.79 2.24 3.1 4.21 3.14-1.54 1.2-3.48 1.92-5.59 1.92-.36 0-.72-.02-1.08-.07 1.98 1.27 4.32 2.02 6.84 2.02 8.21 0 12.71-6.8 12.71-12.71l-.01-.58c.87-.63 1.63-1.42 2.23-2.32z"
          />
        </svg>
      </a>
    </div>
    </div>
  </div>

  );
};

export default App;
