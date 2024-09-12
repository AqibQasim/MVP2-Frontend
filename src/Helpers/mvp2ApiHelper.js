
export const mvp2ApiHelper= async(payload)=>{
    const {endpoint,token,method,body,params}= payload;
    const url=`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/${endpoint}`
    console.log(url)
    const response= await fetch(url,{
        method,
        body: JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });

    const result= await response.json();

    return result;
}