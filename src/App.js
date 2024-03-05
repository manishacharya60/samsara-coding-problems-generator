import React, { useState } from "react";
import OpenAI from "openai";

function App() {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cleanCode = (code) => {
        const pattern = /```|``|`/g;
        return code.replace(pattern, "");
    };

    const parseApiResponse = (responseContent) => {
        const sectionsRaw = responseContent
            .split("**")
            .map((section) => section.trim())
            .filter((section) => section !== "");
        const sections = [];
        for (let i = 0; i < sectionsRaw.length; i += 2) {
            sections.push({
                title: cleanCode(sectionsRaw[i]),
                content: cleanCode(sectionsRaw[i + 1]),
            });
        }
        return sections;
    };

    const fetchData = async () => {
        setIsLoading(true);

        const openai = new OpenAI({
            apiKey: process.env["REACT_APP_OPENAI_API_KEY"],
            dangerouslyAllowBrowser: true,
        });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Generate a coding interview question with a randomly selected difficulty level (easy, medium, or hard). The question should be suitable for a coding interview at top tech companies like Google, Facebook, Amazon, Microsoft, etc. Include the following details in your response, each clearly separated:\n1. **Difficulty Level:** Specify whether the question is easy, medium, or hard.\n2. **Question:** Provide the coding interview question. \n3. **Examples:** Include example inputs and outputs to illustrate how the problem and solution work. \n4. **Solution:** Give a detailed solution to the problem using only java programming language. \n5. **Explanation:** Provide an explanation of how the solution works. \n6. **Time Complexity:** Analyze the time complexity of the solution. \n7. **Space Complexity:** Analyze the space complexity of the solution. \nUse this clear separator (`**`) for each section without deviation. Your response should strictly adhere to this formatting guideline to ensure clarity and consistency.",
                    },
                    { role: "user", content: "Generate the question" },
                ],
            });

            const apiResponseContent = response.choices[0].message.content;
            const parsedSections = parseApiResponse(apiResponseContent);
            setSections(parsedSections);
        } catch (error) {
            console.error("Error fetching data from OpenAI:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="App">
            <button onClick={fetchData} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Data"}
            </button>

            {sections.map((section, index) => (
                <div key={index}>
                    <h2>{section.title}</h2>
                    <pre>
                        <code>{section.content}</code>
                    </pre>
                </div>
            ))}
        </div>
    );
}

export default App;
