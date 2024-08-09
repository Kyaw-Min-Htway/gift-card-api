import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
    const [data, setData] = useState({
        totalCalls: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        chartData: {
            labels: [],
            datasets: []
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.post('API_URL/get-token', {
                    // Request payload
                });
                const token = tokenResponse.data.token;

                const transactionsResponse = await axios.get('API_URL/get-transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const transactions = transactionsResponse.data;

                const monthlyData = transactions.monthlyData || [];  // Fallback if monthlyData is undefined

                setData({
                    totalCalls: transactions.totalCalls,
                    successfulTransactions: transactions.successfulTransactions,
                    failedTransactions: transactions.failedTransactions,
                    chartData: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [
                            {
                                label: 'API Calls',
                                data: monthlyData,
                                fill: false,
                                backgroundColor: 'rgb(75, 192, 192)',
                                borderColor: 'rgba(75, 192, 192, 0.2)',
                            },
                        ],
                    },
                });
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navigation */}
            <nav className="bg-blue-600 p-4 text-white">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Gift Card API Dashboard</h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">API Sections</h2>
                        <ul className="mt-4">
                            <li><a href="#get-token" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Get Token API</a></li>
                            <li><a href="#buy-card" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Buy Card API</a></li>
                            <li><a href="#get-transaction" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Get Transaction API</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Panel */}
                <main className="flex-1 p-6">
                    {/* Overview Section */}
                    <section id="overview" className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-lg font-semibold">Total API Calls</h3>
                                <p className="text-3xl mt-2">{data.totalCalls}</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-lg font-semibold">Successful Transactions</h3>
                                <p className="text-3xl mt-2">{data.successfulTransactions}</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-lg font-semibold">Failed Transactions</h3>
                                <p className="text-3xl mt-2">{data.failedTransactions}</p>
                            </div>
                        </div>
                    </section>

                    {/* Chart Section */}
                    <section id="chart" className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Monthly API Calls</h2>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <Line data={data.chartData} />
                        </div>
                    </section>

                    {/* API Details Section */}
                    <section id="get-token" className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Get Token API</h2>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <p className="text-gray-700">This API method is used to obtain an authorization token for subsequent API calls. The token is valid for five minutes.</p>
                        </div>
                    </section>

                    <section id="buy-card" className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Buy Card API</h2>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <p className="text-gray-700">Allows merchants to buy gift cards by providing specific details such as Card Type, Balance, Currency, etc.</p>
                        </div>
                    </section>

                    {/* Add more sections for other APIs */}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
