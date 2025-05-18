import PageHolder from "./PageHolder";
import { useEth } from "../contexts/EthContext";
import { useState } from "react";

function SignUp() {
    const { state: { userManagerContract, accounts } } = useEth();
    const [username, setUsername] = useState('');
    const [userNid, setUserNid] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const ret = await userManagerContract.methods.registerUser(username, userNid).send({ from: accounts[0] });
        } catch (error) {
            if (error.reason)
                console.log(error.reason);
            console.log(error);

        }
    }

    return (
        <PageHolder>
            <form>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className="mb-3">
                    <label className="form-label">User NID</label>
                    <input type="text" className="form-control" id="nid" placeholder="Enter NID"
                        onChange={(e) => setUserNid(e.target.value)} value={userNid} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Submit</button>
            </form>
        </PageHolder>
    );
}

export default SignUp;