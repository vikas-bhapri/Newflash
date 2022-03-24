import loading from './loading.gif'
import React, { Component } from 'react'

export default class Spinner extends Component {
  
  render() {
    let {width} = this.props
    return (
      <div className='text-center'>
        <img src={loading} alt="" width={width}/>
      </div>
    )
  }
}
