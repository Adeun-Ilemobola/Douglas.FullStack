import React from 'react';

function Toast({value , type = "default"}:{value:string , type:"danger"|"success"|"warning"|"default"}) {
   if (type === 'danger') {
       return (
           <div className="alert alert-danger fade show position-fixed top-0 start-0 m-3" role="alert">
               {value}
           </div>
       )
   }

   if (type === 'success') {
       return (
           <div className="alert alert-success fade show position-fixed top-0 start-0 m-3" role="alert">
               {value}
           </div>
       )
   }

   if (type === 'warning') {
       return (
           <div className="alert alert-warning fade show position-fixed top-0 start-0 m-3" role="alert">
               {value}
           </div>
       )
   }

   if (type === 'default') {
       return (
           <div className="alert alert-info fade show position-fixed top-0 start-0 m-3" role="alert">
               {value}
           </div>
       )
   }
}

export default Toast;