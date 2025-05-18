import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const navLinkStyle = {
    textDecoration: 'none',
    color: 'black'
}


function Nav() {

    const navigate = useNavigate();
    useEffect(() => {
        window.ethereum.on('accountsChanged', newAccounts => {
            if (localStorage.getItem('userSession') != null && !localStorage.getItem('userSession').split(',')[0].toUpperCase() == newAccounts[0].toUpperCase());
            navigate('/logout')
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand"><NavLink style={navLinkStyle} to="/">MPF</NavLink></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            localStorage.getItem('userSession') != null ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/">User Profile</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/userManager">User Manager</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/reportUser">Report User</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/reportManager">Report Manager</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/investigaionManager">Schedule Manager</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/TransferFunds">Transfer Funds</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/logout">Logout</NavLink></span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/signup">Sign Up</NavLink></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"><NavLink style={navLinkStyle} to="/Login">Login</NavLink></span>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item dropdown d-none">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item d-none">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Nav;