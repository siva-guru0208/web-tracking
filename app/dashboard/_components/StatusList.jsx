import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function StatusList(attendanceList) {
    const [totalStudent,setTotalStudent]=useState(0);
    const [presentperc,setPresentPerc]=useState(0);
    
    useEffect(()=>{
        if(attendanceList)
        {
           const totalSt=getUniqueRecord(attendanceList);
           setTotalStudent(totalSt);

           const today=moment().format('D');
           const PresentPrec=(attendanceList.length/(totalSt.length*Number(today))*100);
           console.log(PresentPrec)
        }

    },[attendanceList])
  return (
    <div>StatusList</div>
  )
}

export default StatusList