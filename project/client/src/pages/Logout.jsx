import { useEffect } from "react";

function Logout() {

    useEffect(() => {
        localStorage.clear()
        window.location = '/'
    }, []);

    return null;
}

export default Logout;