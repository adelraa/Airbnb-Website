import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

try {
    if (!prisma) {
        throw new Error("Prisma is not properly initialized.");
      }
      
      const listingAndReservation = await prisma.listing.update({
       where:{
        id:listingId,
       },
       data: {
        reservations:{
            create:{
                userId:currentUser.id,
                startDate,
                endDate,
                totalPrice
            }
        }
      }
      });
    
      return NextResponse.json(listingAndReservation);
} catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
}
}