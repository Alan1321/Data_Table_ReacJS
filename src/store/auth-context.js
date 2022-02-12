import React from "react";

const AuthContext = React.createContext({
    id_to_delete:{},
    onmethod:()=>{},
    idChange:()=>{},
    onFirstLinkRowDelete:()=>{},
    data:[]
});


export default AuthContext;