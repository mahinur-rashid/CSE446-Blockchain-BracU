import PageHolder from "./PageHolder";
import { useEth } from "../contexts/EthContext";
import { useState } from "react";

function ReportUser() {
    const { state: { userManagerContract, reportManagerContract, accounts } } = useEth();
    const [username, setUsername] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [userHeight, setUserHeight] = useState(0);
    const [userDescription, setUserDescription] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [userContact, setUserContact] = useState('');

    const handleReport = async (event) => {
        event.preventDefault();

        try {
            const ret = await reportManagerContract.methods.reportMissing(
                username, userAge,
                userHeight, userDescription,
                userLocation, userContact
            ).send({ from: accounts[0] });
        } catch (error) {
            if (error.reason)
                console.log(error.reason);
            console.log(error);

        }
        return false;
    }

    return (
        <PageHolder>
            <h1>Report Missing User</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter person name"
                        onChange={(e) => setUsername(e.target.value)} value={username} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter person's age"
                        onChange={(e) => setUserAge(e.target.value)} value={userAge} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Height</label>
                    <input type="number" className="form-control" id="height" placeholder="Enter person's height"
                        onChange={(e) => setUserHeight(e.target.value)} value={userHeight} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter person's description"
                        onChange={(e) => setUserDescription(e.target.value)} value={userDescription} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Last Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter person's last location"
                        onChange={(e) => setUserLocation(e.target.value)} value={userLocation} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input type="text" className="form-control" id="contact" placeholder="Enter person's relative contact"
                        onChange={(e) => setUserContact(e.target.value)} value={userContact} required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleReport}>Submit</button>
            </form>
        </PageHolder>
    );
}

export default ReportUser;