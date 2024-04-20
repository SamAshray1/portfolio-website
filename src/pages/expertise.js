import code from "../static/code.png"
import devops from "../static/devops.png"
import fullstack from "../static/fullstack.png"

export default function Expertise(){
    return(
        <div className="expertise" id="expertise">
        <h2>My Expertise</h2>
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
            <div className="expertise-item hidden">
                <p><b>"So do not fear, for I am with you do not be dismayed, for I am your God.
I will strengthen you and help you;
I will uphold you with my righteous right hand."<br /><br />Isaiah 41:10</b></p>
            </div>
        </div>
        </div>
    )
}