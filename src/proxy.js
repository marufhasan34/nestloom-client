import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session?.user?.role == 'owner' && session?.user?.plan == 'free'){
        return NextResponse.redirect(new URL('/pricing', request.url))
    }
    if(session?.user?.role == 'tenant' && session?.user?.plan == 'free'){
        return NextResponse.redirect(new URL('/pricing', request.url))
    }

    if(!session){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
   matcher: ['/profile', '/dashboard/owner', '/dashboard/tenant']
}