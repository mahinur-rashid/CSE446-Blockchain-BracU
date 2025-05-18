import React, { useEffect, useState } from 'react';
import PageHolder from './PageHolder';
import { useEth } from '../contexts/EthContext';

function TransferFunds() {
    const { state: { investigationManagerContract, userManagerContract, accounts } } = useEth();
    const [tableData, setTableData] = useState([]);
    const [balance, setBalance] = useState(0);
    const [payble, setPayable] = useState(0);
    const [error, setError] = useState(null);

    const getBalance = async () => {
        const newBalance = await investigationManagerContract?.methods.getBalance().call();
        setBalance(parseInt(newBalance));
    }

    useEffect(() => {
        getBalance();
    }, [investigationManagerContract, userManagerContract, accounts])

    const handlePay = async (adminAddr) => {
        setError(null)
        try {
            const payabeInt = parseInt(payble);
            if (payabeInt <= 0)
                setError('Error: Invalid Amount');
            else if (payabeInt > balance)
                setError('Error: Low Balance');
            else {
                const status = await investigationManagerContract.methods.transferToUser(adminAddr, payabeInt).send({ from: accounts[0] });
                getBalance();
            }
        } catch (errorTsx) {
            setError('Error: Invalid Amount');
            console.log(errorTsx);

        }
        console.log(adminAddr, payble, payble <= 0, payble > balance, balance);
    }

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

    return (
        <PageHolder className='text-center d-flex flex-column'>
            {error ? (<span className='bg-danger text-white text-bold text-start w-100 p-2'>{error}</span>) : null}
            <h1>Transfer to Admin</h1>
            <h3>Current Balance: ${balance}</h3>
            <hr className='my-0 mb-3' />
            <input type="number" value={payble} onChange={e => setPayable(e.target.value)} className="form-control" id="pay" placeholder="Enter amount" />
            {
                tableData.length > 0 ?
                    (<table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Address</th>
                                <th>Name</th>
                                <th>NID</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.filter(user => user[3] == 0).map(user => (
                                <tr key={user[0]}>
                                    <td>{user[0]}</td>
                                    <td>{user[1]}</td>
                                    <td>{user[2]}</td>
                                    <td>
                                        <button
                                            onClick={() => handlePay(user[0])}
                                            className="btn btn-secondary" type="submit">
                                            Pay
                                        </button>
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

export default TransferFunds;