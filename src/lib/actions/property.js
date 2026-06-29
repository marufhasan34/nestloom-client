'use server'
import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createProperty = async (newPropertyData) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    
    console.log('baseUrl:', baseUrl)  
    console.log('token:', token)

    const res = await fetch(`${baseUrl}/api/property`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPropertyData)
    });

    return res.json();
}