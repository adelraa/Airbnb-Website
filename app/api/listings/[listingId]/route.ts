import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    if (!prisma) {
        throw new Error("Prisma is not properly initialized.");
      }
      
      const listing = await prisma.listing.deleteMany({
        where: {
          id: listingId,
          userId: currentUser.id
        }
      });
    
      return NextResponse.json(listing);
} catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
}

}