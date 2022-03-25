import loading from './loading.gif'
import React from 'react'

const Spinner = (props) => {
  

    let {width} = props
    return (
      <div className='text-center'>
        <img src={loading} alt="" width={width}/>
      </div>
    )

}

export default Spinner;
