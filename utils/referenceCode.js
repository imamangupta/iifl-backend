
let createReferenceCode = (length) => {
   let result = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let getOtp =() =>{
   return Math.floor(100000 + Math.random() * 9000);
}

module.exports = {
   createReferenceCode: createReferenceCode,
   getOtp: getOtp
}