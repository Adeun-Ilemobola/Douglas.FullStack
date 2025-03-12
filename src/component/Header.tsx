import UserHeaderCard from "./userHeaderCard";
import {userCardProps} from "../TYPE";
import ThemeToggle from "./UI/ThemeToggle";
import Button from "./UI/Button";
import {Link} from "react-router-dom";
import SciFiLogo from "./SVG";


function Header({userDate , endSession}:{userDate:userCardProps , endSession: () => void}) {
    return (
        <header className={"HEADER"}>
            <div className="sub">
                {/*the logo and name */}
                <div className="logoContainer">
                    <SciFiLogo
                        primaryColor="#0056b3"
                        secondaryColor="#fafafa"
                        accentColor="#e64a19"
                        width={250}
                        height={250}
                    />

                </div>
                {/*the nav  section or link*/}
                <div className="nav">
                    <h1>nav</h1>

                </div>



                <div className="navRight">
                    <ThemeToggle/>
                    <Button onClick={endSession}>logout</Button>
                    <Link to={`/Settings/${userDate.name}/${userDate.id}`}>
                        <UserHeaderCard name={userDate.name} id={userDate.id} img={userDate.img}/>
                    </Link>

                </div>
            </div>

        </header>
    );
}

export default Header;