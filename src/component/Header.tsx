import UserHeaderCard from "./userHeaderCard";
import {userCardProps} from "../TYPE";
import ThemeToggle from "./UI/ThemeToggle";
import Button from "./UI/Button";


function Header({userDate , endSession}:{userDate:userCardProps , endSession: () => void}) {
    return (
        <header className={"HEADER"}>
            <div className="sub">
                {/*the logo and name */}
                <div className="logoContainer">
                    <h1>logoCon</h1>

                </div>
                {/*the nav  section or link*/}
                <div className="nav">
                    <h1>nav</h1>

                </div>

                <div className="navRight">
                    <ThemeToggle/>
                    <Button onClick={endSession}>logout</Button>
                    <UserHeaderCard name={userDate.name} id={userDate.id} img={userDate.img}/>
                </div>
            </div>

        </header>
    );
}

export default Header;