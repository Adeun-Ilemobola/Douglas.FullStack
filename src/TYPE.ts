export type userCardProps = {
    img?: string,
    name: string,
    id : string,
}

export type file = {
    name: string,
    bs64: string
}



export type userSession = {
    username: string,
    email: string,
    id: string,

}


export type Session ={
    user:userSession,
    expire: number,
    sessionId:string,
}