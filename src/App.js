import OpenAI from "openai";
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
                            "Generate a coding interview question with a uniquely selected difficulty level (easy, medium, or hard). The question should be suitable for a coding interview at top tech companies like Google, Facebook, Amazon, Microsoft, etc. The questions should be strictly unique with no repitation. Include the following details in your response, each clearly separated:\n1. **Question:** Provide the coding interview question. \n2. **Examples:** Include example inputs and outputs to illustrate how the problem and solution work. \n3. **Solution:** Give a detailed solution to the problem using only java programming language. \n4. **Explanation:** Provide an explanation of how the solution works. \n5. **Time Complexity:** Analyze the time complexity of the solution. \n6. **Space Complexity:** Analyze the space complexity of the solution. \nUse this clear separator (`**`) before and after heading title for each section without deviation. Please stick to the formatting style mentioned above. Your response should strictly adhere to this formatting guideline to ensure clarity and consistency.",
                    },
                    { role: "user", content: "Generate the question" },
                ],
            });

            console.log(response);

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
            <ProblemsContainer
                sections={sections}
                isLoading={isLoading}
                fetchData={fetchData}
            ></ProblemsContainer>
        </div>
    );
}

export default App;
