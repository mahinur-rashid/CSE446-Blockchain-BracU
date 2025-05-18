import React, { useEffect, useState } from 'react';
import PageHolder from './PageHolder';
import { useEth } from '../contexts/EthContext';

function InvestigationManager() {
    const { state: { userManagerContract, investigationManagerContract, accounts } } = useEth();
    const [tableData, setTableData] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {

        const test = async () => {
            if (userManagerContract && investigationManagerContract) {
                const td = [];
                const appointments = []
                const users = await investigationManagerContract.methods.getInvestigators().call();
                for (let i = 0; i < users.length; i++) {
                    td.push(await userManagerContract.methods.getUser(users[i]).call());
                    appointments.push(await investigationManagerContract.methods.getInvestigatorAppointment(users[i]).call());
                }
                setTableData(td);
                setAppointmentData(appointments);
            }

        }
        test();
    }, [userManagerContract, investigationManagerContract])

    const handleSchedule = async (userAddr, slot) => {
        await investigationManagerContract.methods.bookAppointment(userAddr, slot).send({ from: accounts[0], value: 2 });
    }

    return (
        <PageHolder className='text-center'>
            <h1>Manager Schedules</h1>
            <hr className='my-0 mb-3' />
            {
                tableData.length > 0 ?
                    (
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Address</th>
                                    <th>Name</th>
                                    <th>Slot 1</th>
                                    <th>Slot 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((user, idx) => (
                                    <tr key={user[0]}>
                                        <td>{user[0]}</td>
                                        <td>{user[1]}</td>
                                        {[0, 1].map(slot => {
                                            return (
                                                <td key={`${slot}${user[0]}`}>{
                                                    appointmentData[idx][slot] == `0x${"0".repeat(40)}` ?
                                                        (<button
                                                            onClick={() => handleSchedule(user[0], slot)}
                                                            className="btn btn-secondary w-100">Assign</button>) :
                                                        appointmentData[idx][slot]
                                                }</td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>) :
                    (
                        <span>No data found</span>
                    )
            }
        </PageHolder>
    );
}

export default InvestigationManager;