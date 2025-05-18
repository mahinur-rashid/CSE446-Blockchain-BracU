import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DefautHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userSession') == null)
            navigate('/login');
        else
            navigate('/userProfile');
    }, [navigate]);

    return null;
}

export default DefautHandler;