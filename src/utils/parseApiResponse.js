export const parseApiResponse = (responseContent) => {
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
