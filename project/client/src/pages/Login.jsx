import PageHolder from "./PageHolder";
import { useEth } from "../contexts/EthContext";

function Login() {
    const { state: { userManagerContract, accounts } } = useEth();

    const handleLogin = async (event) => {
        if (await userManagerContract.methods.userExists(accounts[0]).call()) {
            const user = await userManagerContract.methods.getUser(accounts[0]).call();
            localStorage.setItem('userSession', user);
            window.location = '/';
        }
    }

    return (
        <PageHolder className='d-flex flex-column gap-2'>
            <h1>Log in to MPF</h1>
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </PageHolder>
    );
}

export default Login;