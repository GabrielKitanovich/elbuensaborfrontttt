import React from 'react'
import MapWrapper from '../components/MapGrapper'
export default function page() {
  return (
    <>
   <div className="flex flex-col items-center space-y-8 relative z-10">
      
      <div className="w-[800px] h-[800px] flex justify-center items-center mx-auto relative z-0">
        <MapWrapper />
      </div>
    </div>
    </>
  )
}
