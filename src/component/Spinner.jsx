import React, { PureComponent } from 'react'
import loading from './loading.gif'

export class Spinner extends PureComponent {
  render() {
    const imgStyle = {
      backgroundColor: 'transparent',
      width:'180px',
      height:'180px',
      borderRadius:"100px"
    }; 
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading img" style={imgStyle} />
      </div>
    )
  }
}

export default Spinner
