export function devMode(url:"localhost" |"render") {
    if (url =="localhost"){
        return "http://localhost:3000/api/";
    }
    if (url == "render"){
        return "https://nodevap.onrender.com/api/";
    }

}


export function devMode2(mode:"localhost" |"render" , url:string) {
    if (mode =="localhost"){
        return `http://localhost:3000/api/${url}`;
    }else if (mode == "render"){
        return `https://nodevap.onrender.com/api/${url}`;
    }else {
        return `http://localhost:3000/api/${url}`;

    }

}