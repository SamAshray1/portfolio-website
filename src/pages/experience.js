import React, { useState } from 'react';

export default function Experience() {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="experience" id="experience">
            <h2>Professional Experience</h2>
            <div className="p-bar" onClick={toggleDetails}>
                <h4>DevOps Engineer @ Optum.Inc</h4>
                <h4>2022-Present</h4>
                <h4>{showDetails ? '-' : '+'}</h4>
            </div>
            <div className={`p-bar-details ${showDetails ? 'open' : ''}`}>
                <p>Implemented Agile workflow, CI/CD with Jenkins, Infrastructure Management with Kubernetes / Docker, Monitoring and Logging with OpenTelemetry and Splunk.</p>
                <div className="tech-items">
                    <p>Java(Springboot)</p>
                    <p>Kubernetes</p>
                    <p>Docker</p>
                    <p>Jenkins</p>
                    <p>Kafka</p>
                    <p>Splunk / OpenTelemetry</p>
                </div>
            </div>
        </div>
    );
}
