import code from "../static/code.png"
import devops from "../static/devops.png"
import fullstack from "../static/fullstack.png"

export default function Expertise(){
    return(
        <div className="expertise" id="expertise">
        <h1>My Expertise</h1>
        <div className="expertise-items">
            <div className="expertise-item">
                <div className="expertise-head">
                    <img src={code}/>
                    <h3>Software Dev</h3>
                </div>
                <p>Proficient in both Functional and OOP: Python, Java (Springboot), JS/TS.</p>
            </div>
            <div className="expertise-item">
            <div className="expertise-head">
                    <img src={devops} />
                    <h3>DevOps Engineer</h3>
                </div>
                <p>Experienced in implementing CI/CD with Jenkins, Infrastructure Management with Kubernetes / Docker, Monitoring and Logging with OpenTelemetry and Splunk.</p>
            </div>
            <div className="expertise-item">
                <div className="expertise-head">
                    <img src={fullstack} />
                    <h3>Fullstack Dev</h3>
                </div>
                <p>Novice Exp in Developing Webapps with features such as Req/Res handling, Data Storage, User Authentication, so on..</p>
            </div>
        </div>
        </div>
    )
}