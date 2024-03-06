import Header from './header';

export default function Homepage(){
    return(
        <div className="homepage">
            <Header defer/>
            <div className="main-content">
                <h1>SAM ASHRAY</h1>
                <p>Devops Engineer & Backend Developer.</p>
            </div>
        </div>
    )
}