const Methods={
    simpleGet:async(data,callback)=>{
        return await fetch(data.url).then(data=>{
            callback(false,data.json());
        }).catch(err=>{
            callback(true,err)
        })
    },
    simplePost: async (data, callback) => {
        return await fetch(data.url, {
          method: "POST",
          body: JSON.stringify(data.data),
          headers: { "Content-type": "application/json" }, // helyes szintaxis
        })
          .then((response) => response.json())
          .then((data) => {
       
            callback(false, data);

            return;
          })
          .catch((err) => {
            console.log(err);
            callback(true, err);
            return;
          });
      },
      simplePostWithOutData: async (data, callback) => {
        return await fetch(data.url, {
          method: "POST",
          headers: { "Content-type": "application/json" }, // helyes szintaxis
        })
          .then((response) => response.json())
          .then((data) => {
           
            callback(false, data);

            return;
          })
          .catch((err) => {

            callback(true, err);
            return;
          });
      }
    
}
export {
    Methods
}