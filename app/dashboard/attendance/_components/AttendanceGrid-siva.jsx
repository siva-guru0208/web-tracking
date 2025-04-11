import { set } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';



const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({attendanceList,selectedMonth}) {
    const [rowData,setRowData]=useState();
    const [colDefs,setColDef]=useState([
        { field:'studentId',filter:true},
        { field:'name',filter:true},
        
    ]);
console.log('attendanceList2', attendanceList);

    const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate();
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
    const daysArrays=Array.from({length:numberOfDays},(_,i)=>i+1)

    useEffect(()=>{
        if(attendanceList)
        {
        const userList=getUniqueRecord(attendanceList);
        setRowData(userList);

        daysArrays.forEach((date)=>{
            setColDef(prevData=>[...prevData,{
                field:date.toString(),width:50,editable:true
            }])

        userList.forEach(obj=>{
            obj[date]=isPresent(obj.studentId,date)
        })

        })
    }
    
    },[attendanceList])

    /**
     * used to check if user present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */

    const isPresent=(studentId,day)=>{
        const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }



   


    /**
     * used to mark student attendance
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    const onMarkAttendance=(day,studentId,presentStatus)=>{

        const date=moment(selectedMonth).format('MM/yyyy')
        if(presentStatus)
        {
            const data={
                day:day,
                studentId:studentId,
                present:presentStatus,
                date:date
            }
            GlobalApi.MaekAttendance(data).then(resp=>{
                console.log(resp);
                toast("Student Id:" +studentId +" Marked as present")
            })
        }
        else{
            GlobalApi.MarkAbsent(studentId,day,date)
            .then(resp=>{
                toast("Student Id:" +studentId +" Marked as absent")
            })
        }
    }

    
    
  return (
    <div> 
        <div
    className="ag-theme-quartz" // applying the Data Grid theme
    style={{ height: 500 }} // the Data Grid will fill the size of the parent container
   >
     <AgGridReact
         rowData={rowData}
         columnDefs={colDefs}
         onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
         pagination={pagination}
         paginationPageSize={paginationPageSize}
         paginationPageSizeSelector={paginationPageSizeSelector}
     />
   </div></div>
  )
}

export default AttendanceGrid