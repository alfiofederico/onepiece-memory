import React from 'react'

export default function Molal({turns}) {
  return (
    <div>
      <h1 className='victory'>Victory! You made it <br />
          in <span className='red'> { turns } </span> turns!
      </h1>
    </div>
  )
}
