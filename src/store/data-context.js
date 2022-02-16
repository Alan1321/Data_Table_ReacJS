import React from "react";

const DataContext = React.createContext({
    id_to_delete:{},
    onmethod:()=>{},
    idChange:()=>{},
    onFirstLinkRowDelete:()=>{},
    data:[]
});

export default DataContext;