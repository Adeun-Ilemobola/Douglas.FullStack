// import React from 'react';



import {userCardProps} from "../TYPE.ts";

function UserHeaderCard({ img, name }: userCardProps) {
    return (
        <div className={"UserHeaderCard"}>
            <div className={"HeaderCardImgContainer"}>
                {img&&<img src={img} alt=""/>}

                <p >{name.substring(0 ,1)}</p>
            </div>

            <p className={"userCardName"}>{name}</p>

        </div>
    );
}

export default UserHeaderCard;