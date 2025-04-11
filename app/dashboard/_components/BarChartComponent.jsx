import { getUniqueRecord } from '@/app/_services/service';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({attendanceList,totalPresentData}) {

    const [data,setData]=useState([]);
    useEffect(()=>{
        formatAttendanceListCount();
    },[attendanceList||totalPresentData])
    const formatAttendanceListCount=()=>{
        const totalStudent=getUniqueRecord(attendanceList);

        const result=totalPresentData.map((item=>({
            day:item.day,
            presentCount:item.presentCount,
            absentCount:Number(totalStudent?.length)-Number(item.presentCount)

        })));
        console.log(result);
        setData(result)
    }
   
}

export default BarChartComponent