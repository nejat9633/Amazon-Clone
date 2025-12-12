import React from 'react'
import {HashLoader} from 'react-spinners'
function Loader() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
      <HashLoader
        color="#f3ae0e"
      />
    </div>
  );
}

export default Loader