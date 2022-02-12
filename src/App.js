import React , {useEffect, useState} from 'react'
import  {Route, Link} from 'react-router-dom';
import Firstlink from './components/Firstlink'
import Secondlink from './components/SecondLink';
import AuthContext from './store/auth-context';

const App = () =>{
  
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [id, setId] = useState({"request_id": "1HRUq2kEQQ"})

  const get_status = `https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status`
  var ids = {"request_id": ["1HRUq2kEQQ", "bjAwLPMPwd", "dk00foKRqP", "DB27ynegt9", "NSYq1WYfKM", "FAMB8rfpne"]}

  const get_result = `https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_result`
  // var id = {"request_id": "1HRUq2kEQQ"}

  useEffect(()=>{
    fetchHandler()
  },[])

  useEffect(()=>{
      fetchHandler2()
  },[id])

  async function fetchHandler(){

      const response = await fetch(get_status,{
          method:'POST',
          body:JSON.stringify(ids)
      })
      let datas = await response.json()
      setData1(datas)
      //console.log('im in handler1 in app', data1)
  }

  async function fetchHandler2(){
      const response = await fetch(get_result,{
        method:'POST',
        body:JSON.stringify(id)
    })
    let datas = await response.json()
    setData2(datas.result.dataValues)
    //console.log('im in handler 2 in app', data2)
  }

  const secondlinkDeleteHandler = (event) => {
    //console.log(JSON.parse(event.target.value))

    if(event.target.value){
      let keys = []
      Object.entries(JSON.parse(event.target.value)).forEach((entry) => {
        const [key, value] = entry;
        //console.log(key, value)
        keys.push(parseInt(key));
      });
      let keys_reversed = keys.reverse();
      const data2_duplicate = [...data2]
      for(let i = 0;i<keys.length;i++){
        console.log(data2_duplicate.splice(keys_reversed[i], 1))
      }
      //console.log(data2_duplicate)
      setData2(data2_duplicate)
    }
  }

  const firstlinkRowDeleteHandler = (event) =>{
    if(event.target.value){
      let json_value = JSON.parse(event.target.value)
      console.log(json_value)
      let keys = []
      Object.entries(JSON.parse(event.target.value)).forEach((entry) => {
        const [key, value] = entry;
        //console.log(key, value)
        keys.push(parseInt(key));
      });
      let keys_reversed = keys.reverse();
      const data1_duplicate = [...data1]

      for(let i = 0;i<keys.length;i++){
        console.log(data1_duplicate.splice(keys_reversed[i], 1))
      }
      //console.log(data2_duplicate)
      setData1(data1_duplicate)
    }
  }

  const idChangeHandler = (event) =>{
      //var id = {"request_id": "1HRUq2kEQQ"}
      let full_id = {"request_id":event.target.value}
      //console.log(full_id);
      setId(full_id)
  }

  return(
      <AuthContext.Provider 
        value={{
          onmethod: secondlinkDeleteHandler,
          idChange:idChangeHandler,
          onFirstLinkRowDelete:firstlinkRowDeleteHandler,
          data:data2
        }}
      >
        <Route path='/' exact>
          <Firstlink data={data1}></Firstlink>
        </Route>
        <Route path='/Secondlink/:id'>
          <Secondlink data={data2}></Secondlink>
        </Route>
      </AuthContext.Provider>

  )
}
export default App
