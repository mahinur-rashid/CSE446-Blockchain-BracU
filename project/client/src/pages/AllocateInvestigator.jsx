import React, { useEffect, useState } from 'react';
import PageHolder from './PageHolder';
import { useEth } from '../contexts/EthContext';
import { useParams } from 'react-router-dom';

function AllocateInvestigator() {
    const { state: { userManagerContract, investigationManagerContract, accounts } } = useEth();
    const [tableData, setTableData] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        const test = async () => {
            if (userManagerContract) {
                const td = []
                const users = await userManagerContract.methods.getAllAddresses().call();
                for (let i = 0; i < users.length; i++) {
                    td.push(await userManagerContract.methods.getUser(users[i]).call());
                }
                setTableData(td);

            }

        }
        test();
    }, [userManagerContract])

    const handleAllocation = async (reportId, userId) => {
        console.log(reportId);
        await investigationManagerContract.methods.assignInvestigator(reportId, userId).send({ from: accounts[0] });

    }

    return (
        <PageHolder><table className="table">
            <thead className="thead-dark">
                <tr>
                    <th>Address</th>
                    <th>Name</th>
                    <th>Allocation</th>
                </tr>
            </thead>
            <tbody>
                {tableData.filter(function (user) {
                    return user[3] == 2;
                }).map(user => (
                    <tr key={user[0]}>
                        <td>{user[0]}</td>
                        <td>{user[1]}</td>
                        <td><button
                            onClick={() => handleAllocation(id, user[0])}
                            className="btn btn-secondary">Assign</button></td>
                    </tr>
                ))}

            </tbody>
        </table>
        </PageHolder>
    );
}

export default AllocateInvestigator;