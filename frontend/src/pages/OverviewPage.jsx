import React from 'react';
import { OverviewBanner, OverviewBooking, OverviewServices } from '../components/Overview';
import OverviewUpComing from '../components/Overview/OverviewUpComing';


function OverviewPage() {
  return (
    <div className='w-full flex flex-col gap-5'>
        <OverviewBanner/>
        <OverviewBooking/>
        <OverviewUpComing />
    </div>
  )
}

export default OverviewPage