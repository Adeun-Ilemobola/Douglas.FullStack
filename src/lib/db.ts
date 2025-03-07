export function devMode(url:"localhost" |"render") {
    if (url =="localhost"){
        return "http://localhost:3000/api/";
    }
    if (url == "render"){
        return "https://nodevap.onrender.com/api/";
    }

}