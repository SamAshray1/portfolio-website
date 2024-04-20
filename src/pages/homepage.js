import Header from './header';

export default function Homepage(){
    return(
        <div className="homepage">
            <Header defer/>
            <div className="main-content">
                <h1>SAM ASHRAY</h1>
                <h3>Devops Engineer & Backend Developer.</h3>
            </div>
        </div>
    )
}