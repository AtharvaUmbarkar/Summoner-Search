import React from 'react'

import '../css/Alert.css'

const Alert = (props) => {
  return (
    <>
      {props.alert && <div className='alert-container' style={
        (props.alert.type === 'error' && { backgroundColor: '#F77684' }) ||
        (props.alert.type === 'warning' && { backgroundColor: '#E0AF68' }) ||
        (props.alert.type === 'success' && { backgroundColor: '#73daca' })
      }>
        <div className={`alert-msg`} role="alert" style={
          (props.alert.type === 'error' && { color: '#f00004' }) ||
          (props.alert.type === 'warning' && { color: '#bb7710' }) ||
          (props.alert.type === 'success' && { color: '#599b14' })
        }>
          &#8277; {props.alert.message}
        </div>
      </div>}
    </>
  )
}

export default Alert