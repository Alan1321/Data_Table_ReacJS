import React , {useEffect, useState, useRef, useLayoutEffect} from 'react'
import  {Route, Link} from 'react-router-dom';
import Firstlink from './components/Firstlink'
import Secondlink from './components/SecondLink';
import DataContext from './store/data-context';
import useInterval from './useInterval';

const App = () =>{
  
  console.log('im in app top')
  const [data1, setData1] = useState([{dataset:"waiting for data",message:'waiting for data'}])
  const [data2, setData2] = useState([])
  const [id, setId] = useState({"request_id": "1HRUq2kEQQ"})
  const [delayTime, setDelayTime] = useState(5000)

  const get_status = `https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status`
  var ids = {"request_id": ["1HRUq2kEQQ", "bjAwLPMPwd", "dk00foKRqP", "DB27ynegt9", "NSYq1WYfKM", "FAMB8rfpne"]}

  const get_result = `https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_result`
  // var id = {"request_id": "1HRUq2kEQQ"}

  useEffect(()=>{
    localStorage.setItem('ids', JSON.stringify(ids))
    fetchHandler()
  },[])

  useInterval(()=>{
    console.log("im in useInterval")
    fetchHandler();
    let waiting = false;
    for(let i = 0;i<data1.length;i++){
      if(data1[i].status !== 'success'){
        waiting = true;
      }
    }
    if(!waiting) setDelayTime(null)
  },delayTime)

  useEffect(()=>{
      fetchHandler2()
  },[id])

  async function fetchHandler(){
      ids = localStorage.getItem('ids')
      const response = await fetch(get_status,{
          method:'POST',
          body:ids
      })
      let datas = await response.json()
      setData1(datas)
  }

  async function fetchHandler2(){
      const response = await fetch(get_result,{
        method:'POST',
        body:JSON.stringify(id)
    })
    let datas = await response.json()
    setData2(datas.result.dataValues)
  }

  const secondlinkDeleteHandler = (event) => {
    if(event.target.value){
      let keys = []
      Object.entries(JSON.parse(event.target.value)).forEach((entry) => {
        const [key, value] = entry;
        keys.push(parseInt(key));
      });
      let keys_reversed = keys.reverse();
      const data2_duplicate = [...data2]
      for(let i = 0;i<keys.length;i++){
        console.log(data2_duplicate.splice(keys_reversed[i], 1))
      }
      setData2(data2_duplicate)
    }
  }

  const firstlinkRowDeleteHandler = (event) =>{
    if(event.target.value){
      var local_storage_arr = JSON.parse(localStorage.getItem('ids')).request_id
      let json_value = JSON.parse(event.target.value)
      let keys = []
      Object.entries(JSON.parse(event.target.value)).forEach((entry) => {
        const [key, value] = entry;
        keys.push(parseInt(key));
      });
      let keys_reversed = keys.reverse();
      const data1_duplicate = [...data1]

      for(let i = 0;i<keys.length;i++){
        console.log(data1_duplicate.splice(keys_reversed[i], 1))
        console.log(local_storage_arr.splice(keys_reversed[i],1))
      }
      localStorage.setItem('ids',JSON.stringify({request_id:local_storage_arr}))
      setData1(data1_duplicate)
    }
  }

  const idChangeHandler = (event) =>{
      let full_id = {"request_id":event.target.value}
      setId(full_id)
  }

  return(
      <DataContext.Provider 
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
      </DataContext.Provider>

  )
}
export default App
