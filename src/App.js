import Prism from "prismjs";
import React, { useState, useEffect } from "react";

// CSS libraries
import "prismjs/components/prism-java";
import "prismjs/themes/prism-okaidia.css";

// Custom CSS
import "../src/css/MainStyle.css";

import ProblemsContainer from "./components/ProblemsContainer";

function App() {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [sections]);

    const parseApiResponse = (responseContent) => {
        const sectionsRaw = responseContent
            .split("**")
            .map((section) => section.trim())
            .filter((section) => section !== "");
        const sections = [];
        for (let i = 0; i < sectionsRaw.length; i += 2) {
            const content = sectionsRaw[i + 1]
                .replace(
                    /```java\s*([\s\S]*?)\s*```/g,
                    "//Solution in Java Programming Language:\n$1"
                )
                .replace(/```/g, "");
            sections.push({
                title: sectionsRaw[i],
                content: content,
            });
        }
        return sections;
    };

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
