import { mathLib } from 'ezswap_math'
import { formatEther } from 'ethers';
import { JsonEditor as Editor } from 'jsoneditor-react';
import { useState, useEffect } from 'react'
import Result from './Result'
const getPrice  = ({bondingCurve,type,spotPrice,delta,tfee,pfee,gfee,n,action='read'})=>{
 try {
  return  mathLib?.[bondingCurve]?.[type](
    Number(spotPrice),
    Number(delta),
    Number(tfee),
    Number(pfee),
    Number(gfee),
    n,
    action
  );
 } catch (error) {
  return {
    "priceData": {
        "delta": 0,
        "spotPrice": 0,
        "userSellPrice": 0,
        "poolBuyPrice": 0,
        "poolBuyPriceFee": 0,
        "userSellPriceFee": 0
    },
    "currentPrice": {
        "userSellPrice": 0
    },
    "nextPrice": {
        "userSellPrice": 0
    }
}
 }
}

function TestEZMath() {
  const [paramsJson,setParamsJson] = useState({
    bondingCurve:'Linear',
    type:'buy',
    spotPrice:2,
    delta:0,
    tfee:0,
    pfee:0,
    gfee:0,
    n:1,
    action:'read',
  });
  const [priceJson,setPriceJson] = useState(getPrice(paramsJson))


  const handlePriceChange = (json)=>{
    console.log(json);
  }
  const handleChange = (json)=>{
    setParamsJson({...json})
    const price = getPrice(json)
    console.log('json',json);
    console.log('price',price);
    setPriceJson({...price})
  }


  useEffect(()=>{
    console.log("mathLib.Linear.buy( 2, 0,0, 0, 0, 1, 'read' )",mathLib.Linear.buy( 2, 0,0, 0, 0, 1, 'read' ));
    console.log("mathLib.Linear.buy( 1, 0,0, 0, 0, 2, 'read' )",mathLib.Linear.buy( 1, 0,0, 0, 0, 2, 'read' ));
    console.log("mathLib.Linear.buy( 3, 0,0, 0, 0, 2, 'read' )",mathLib.Linear.buy( 3, 0,0, 0, 0, 2, 'read' ));
    console.log("mathLib.Linear.buy( 3, 0.1,0, 0, 0, 2, 'read' )",mathLib.Linear.buy( 3, 0.1,0, 0, 0, 2, 'read' ));
    console.log("mathLib.Linear.sell(1, 0.1, 0.003, 0.003, 2, 0, 'create')",mathLib.Linear.buy( 3, 0.1,0, 0, 0, 2, 'read' ));
  },[])
  return (
    <div className="App">
      <h3>Params</h3>
      <Editor
        value={paramsJson}
        onBlur={handleChange}
        onChange={handleChange}
      />
      <Result priceJson={priceJson}/>
    </div>
  );
}

export default TestEZMath;
