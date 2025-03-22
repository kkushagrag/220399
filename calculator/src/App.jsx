import { useState } from "react";
import axios from "axios";

function App() {
  const [numberType, setNumberType] = useState("e"); // Default to even numbers
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setResponse(result.data);
    } catch (error) {
      setError("Failed to fetch numbers. Please try again.");
      console.error("Error fetching numbers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Average Calculator Frontend
      </h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Number Type</label>
          <select
            value={numberType}
            onChange={(e) => setNumberType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </div>

        <button
          onClick={fetchNumbers}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Fetching..." : "Fetch Numbers"}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Previous Window:</span>{" "}
                {response.windowPrevState.join(", ") || "None"}
              </p>
              <p>
                <span className="font-semibold">Current Window:</span>{" "}
                {response.windowCurrState.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Numbers Fetched:</span>{" "}
                {response.numbers.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Average:</span> {response.avg}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;