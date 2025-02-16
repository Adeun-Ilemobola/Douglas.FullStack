
export function minMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;

}


export  function idGen():string {
    const atoz19 = "zxcvbnmlkjhgfdsapoiuytrewqQWERTYUIOPLKJHGFDSAZXCVBNM1234567890!"
    let segment = 0;
    let id  = "";

    while (segment < 3) {
        for (let i = 0; i < 9; i++) {
            id += atoz19[minMax(0 ,atoz19.length - 1)];
        }
        if (segment  < 2) {
            id+="-";
        }
        segment++;
    }
    return id;

}


export async function getData(path:string):Promise<any> {
    try{
        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`)
            return { error:" something went wrong. Please check your info." };

        }

        return await response.json();

    }catch(error){
        console.error("Error fetching data:", error);
        return { error: 'Error fetching data' }
    }
}




export async function postData(path:string , data:object):Promise<any> {
    try{
        const response = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`)
            return { error:" something went wrong. Please check your info." };
        }

        return await response.json();

    }catch(error){
        console.error("Error fetching data:", error);
        return { error: 'Error fetching data' }
    }
}

