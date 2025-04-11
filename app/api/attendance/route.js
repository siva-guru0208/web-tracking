import Student from "@/app/dashboard/students/page"
import { db } from "@/utils"
import { ATTENDANCE, STUDENTS } from "@/utils/schema"
import { id } from "date-fns/locale"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req) {

    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const month = searchParams.get('month');
    const result = await db.select({

        name: STUDENTS.name,
        attendanceId: ATTENDANCE.id,
        studentId: STUDENTS.id,
        grade: STUDENTS.grade,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,




    }).from(STUDENTS)
        .leftJoin(ATTENDANCE, and (eq(STUDENTS.id, ATTENDANCE.studentId),eq(ATTENDANCE.date,month)))
        .where(eq(STUDENTS.grade, grade))
        

    return NextResponse.json(result);

}


export async function POST(req, res) {
    const data = await req.json();
    const result = await db.insert(ATTENDANCE)
        .values({
            studentId: data.studentId,
            present: data.present,
            day: data.day,
            date: data.date

        })

    return NextResponse.json(result);
}

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');


    const result = await db.delete(ATTENDANCE)
        .where(
            and(
                eq(ATTENDANCE.studentId, studentId),
                eq(ATTENDANCE.date, date),
                eq(ATTENDANCE.day, day)

            )
        )



    return NextResponse.json(result);
}