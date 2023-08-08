import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

export default function middleWare(req: NextRequest) {

    let verify = req.cookies.get('loggedIn');
    let url: string = req.url;

    if (!verify && (url.includes("/create-post") || url.includes('/dashboard') || url.includes('/edit-post'))) {
        return NextResponse.redirect('http://localhost:3000/');
    }
}