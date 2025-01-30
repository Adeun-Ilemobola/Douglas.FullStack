import UserHeaderCard from "./userHeaderCard.tsx";
import {userCardProps} from "../TYPE.ts";
import ThemeToggle from "./UI/ThemeToggle.tsx";


function Header({userDate}:{userDate:userCardProps}) {
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
                    <UserHeaderCard name={userDate.name} id={userDate.id} img={userDate.img}/>
                </div>
            </div>

        </header>
    );
}

export default Header;