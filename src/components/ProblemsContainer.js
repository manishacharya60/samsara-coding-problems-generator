import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Custom CSS
import "../css/ProblemsContainer.css";

function ProblemsContainer({ sections, isLoading, fetchData }) {
    const titleToClassName = (title) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "");

    return (
        <Container>
            <Row className="justify-content-center align-items-center">
                <Col xs lg="6" sm="12">
                    <div className="ProblemsContainer">
                        <Tabs
                            defaultActiveKey="questions"
                            id="coding-problems-tabs"
                        >
                            <Tab eventKey="questions" title="Questions">
                                {sections.map((section, index) => {
                                    if (
                                        section.title === "Question:" ||
                                        section.title === "Examples:"
                                    ) {
                                        return (
                                            <div
                                                key={index}
                                                className={titleToClassName(
                                                    section.title
                                                )}
                                            >
                                                <h3>{section.title}</h3>
                                                {section.title ===
                                                "Examples:" ? (
                                                    <pre>
                                                        <code className="language-java">
                                                            {section.content}
                                                        </code>
                                                    </pre>
                                                ) : (
                                                    <p>{section.content}</p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    className="fetch-data-button"
                                    onClick={fetchData}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Fetch Data"}
                                </button>
                            </Tab>
                            <Tab eventKey="solutions" title="Solutions">
                                {sections.map((section, index) => {
                                    if (
                                        section.title !== "Question:" &&
                                        section.title !== "Examples:"
                                    ) {
                                        return (
                                            <div
                                                key={index}
                                                className={titleToClassName(
                                                    section.title
                                                )}
                                            >
                                                <h3>{section.title}</h3>
                                                {section.title ===
                                                    "Solution:" ||
                                                section.title ===
                                                    "Explanation:" ? (
                                                    <pre>
                                                        <code className="language-java">
                                                            {section.content}
                                                        </code>
                                                    </pre>
                                                ) : (
                                                    <p>{section.content}</p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProblemsContainer;
