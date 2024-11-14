import React from 'react'

const alert = (prop) => {
  return (
    <div>
<div style={{height:"40px"}}>
 { prop.ale &&  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{prop.ale.status}</strong> {prop.ale.msg}
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> }
</div>

    </div>
  )
}

export default alert
