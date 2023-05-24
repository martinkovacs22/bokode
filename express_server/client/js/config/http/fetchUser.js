export const fetchUser ={
    get:(url,callback)=>{
        fetch(url).then(data=>{
            return data.json();
        }).then(data=>{
            callback(false,data);
        }).catch((err)=>{
            callback(true,err);
        })
    },
    post:(url,data,callback)=>{
        fetch(url,{
            headers: {
                'Content-Type': 'application/json'
              },
            method:"POST",
            body:JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            callback(false,data);
          console.log(data);
        })
        .catch(error => {
            callback(true,error);
          console.error(error);
        });
    },
    postWitOutData:(url,callback)=>{
        fetch(url,{
            headers: {
                'Content-Type': 'application/json'
              },
            method:"POST"
        }).then(response => response.json())
        .then(data => {
            callback(false,data);
          console.log(data);
        })
        .catch(error => {
            callback(true,error);
          console.error(error);
        });
    }
}