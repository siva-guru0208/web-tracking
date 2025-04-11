"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
import AttendanceGrid from './_components/AttendanceGrid';


function Attendance() {
  const [selectedMonth,setSelectedMonth]=useState();
  const [selectedGrade,setSelectedGrade]=useState();
  const [attendanceList,setAttendanceList]=useState();
  const onSearchHandler=()=>{
    /**
     * used to fetch attendance list for give month and grade
     */
    const month=moment(selectedMonth).format('MM/YYYY')
    console.log(month);

    GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
         setAttendanceList(resp.data);
    })

  }
  return (
    <div className='p-7'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      {/* Search option */}
      <div className='flex gap-4 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>

          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)} />
        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Grade:</label>

          <GradeSelect selectedGrade={(v)=>setSelectedGrade(v)} />
        </div>
        <Button
        onClick={()=>onSearchHandler()}
        >Search</Button>
      </div>


      {/* Student Attendance grid */}
      <AttendanceGrid attendanceList={attendanceList}
      selectedMonth={selectedMonth}/>
    </div>
  )
}

export default Attendance