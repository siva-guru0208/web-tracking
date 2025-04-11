 /**
     * Used to get District User List
     * @returns 
     */
  export const getUniqueRecord=(attendanceList)=>{
    const uniqueRecord=[];
    const existinguser=new Set();

    attendanceList?.forEach(record => {
        if(!existinguser.has(record.studentId)){
            existinguser.add(record.studentId);
            uniqueRecord.push(record);
        }

    });
    return uniqueRecord;
}