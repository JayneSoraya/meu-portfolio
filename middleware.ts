import { match } from "assert";
import { NextResponse } from "next/server";
import type {NextRequest} from "next/server"; 

export function middleware(request: NextRequest){
    const token = request.cookies.get('portifolio_token');

    if(request.nextUrl.pathname.startsWith('/videos')){
        if(!token){
            return NextResponse.redirect(new URL ('/', request.url));
        }
    }
    return NextResponse.next();

}
export const config = {
    matcher: ['/videos/:path*'],
};