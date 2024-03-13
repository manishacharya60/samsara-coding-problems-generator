import Prism from "prismjs";
import React, { useState, useEffect } from "react";
import { parseApiResponse } from "./utils/parseApiResponse";

// CSS Libraries
import "prismjs/components/prism-java";
import "prismjs/themes/prism-okaidia.css";

// Custom CSS
import "../src/css/MainStyle.css";

// Custom Components
import ProblemsContainer from "./components/ProblemsContainer";

function App() {
    // State
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Highlight code blocks using Prism.js
    useEffect(() => {
        Prism.highlightAll();
    }, [sections]);

    // Fetch data from the backend
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                "https://ooruv9byzj.execute-api.us-east-2.amazonaws.com/beta/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const apiResponse = await response.json();
            const apiResponseContent = JSON.parse(apiResponse.body);

            // Parse the API response
            const parsedSections = parseApiResponse(apiResponseContent);
            setSections(parsedSections);
        } catch (error) {
            console.error("Error fetching data from backend:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="App">
            <ProblemsContainer
                sections={sections}
                isLoading={isLoading}
                fetchData={fetchData}
            ></ProblemsContainer>
        </div>
    );
}

export default App;
