import React, { useEffect, useState } from 'react';
import PageHolder from './PageHolder';
import { useEth } from '../contexts/EthContext';

function UserManager() {
    const { state: { userManagerContract, accounts } } = useEth();
    const [tableData, setTableData] = useState([]);

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

    const handleRoleChange = async (index, userAddr) => {
        console.log(userAddr, index);
        await userManagerContract.methods.changeRole(userAddr, index).send({ from: accounts[0] });
    }

    return (
        <PageHolder className='text-center'>
            <h1>Manege Users</h1>
            <hr className='my-0 mb-3' />
            {
                tableData.length > 0 ?
                    (<table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Address</th>
                                <th>Name</th>
                                <th>NID</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(user => (
                                <tr key={user[0]}>
                                    <td>{user[0]}</td>
                                    <td>{user[1]}</td>
                                    <td>{user[2]}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user[3] == 0 ? "Admin" : user[3] == 1 ? "Reporter" : "Investigator"}
                                            </button>
                                            <ul className="dropdown-menu">
                                                {['Admin', 'Reporter', 'Investigator'].map((element, index) => (
                                                    user[3] != index ? (
                                                        <React.Fragment key={index}>
                                                            <li onClick={() => handleRoleChange(index, user[0])} ><a className="dropdown-item">{element}</a></li>
                                                        </React.Fragment>
                                                    ) : null
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
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

export default UserManager;