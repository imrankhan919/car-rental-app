import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () => {

    const { user } = useSelector(state => state.auth)

    const [isLoggedIn, setILoggedIn] = useState(false)
    const [checkStatus, setCheckStatus] = useState(true)

    useEffect(() => {
        user ? setILoggedIn(true) : setILoggedIn(false)
        setCheckStatus(false)
    }, [user])

    return { isLoggedIn, checkStatus }

}

export default useAuthStatus