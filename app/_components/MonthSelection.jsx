"use client"
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CalendarDaysIcon } from 'lucide-react'

import {addMonths, set} from 'date-fns';
import moment from 'moment'
import { Calendar } from "@/components/ui/calendar"




function MonthSelection({selectedMonth}) {
    const today=new Date();

    const nextMonths=addMonths(new Date(),0);
    const [month,setMonth]=useState(nextMonths);

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline"
                     className="flex gap-2 items-center text-slate-500">
                        <CalendarDaysIcon className='h-5 w-5'/>
                        {moment(month).format('MMM YYYY')}
                       </Button>
                </PopoverTrigger>
                <PopoverContent>
                <Calendar
    mode="single"
    month={month}
    onMonthChange={(value)=>{selectedMonth(value);setMonth(value)}}
    className="flex flex-1 justify-center"
  />
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default MonthSelection