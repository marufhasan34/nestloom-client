const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyProperty = async (myPropertyId, status = 'Pending') => {
    const res = await fetch(`${baseUrl}/api/property?myPropertyId=${myPropertyId}`)
}