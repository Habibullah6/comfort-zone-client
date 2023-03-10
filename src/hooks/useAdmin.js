import { useEffect, useState } from "react"

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(null)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/allUsers/admin/${email}`)
        .then(res => res.json())
        .then(data => {
            setIsAdmin(data?.isAdmin)
            setIsAdminLoading(false)
        })
    }, [email])


    return [isAdmin, isAdminLoading]
}

export default useAdmin;