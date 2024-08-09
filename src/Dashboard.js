import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { line } from 'react-chartjs-2';


const Dashboard = () => {
    const [data, setData] = useState({
        totalCalls: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        chartData: {},
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.post('API_URL/get-token', {
                    // Resquest payload
                });
                const token = tokenResponse.data.token;

                const transactionsResponse = await axios.get('API_URL/get-transactions', {
                    header: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const transactions = transactionsResponse.data;

                setData({
                    totalCalls: transactions.totalCalls,
                    successfulTransactions: transactions.successfulTransactions,
                    failedTransactions: transactions.failedTransactions,
                    chartData: {
                        labels: ['january', 'february', 'march', 'april', 'may', 'june', 'july'],
                        datasets: [
                            {
                                label: 'API CALLs',
                                data: transactions.monthlyData,
                                fill: false,
                                backgroundColor: 'rgb(75, 192, 192)',
                                borderColor: 'rgba(75, 192, 192, 0.2)',
                            },
                        ],
                    },
                }),
             } catch (error) {
                console.error("Error fetching data", error);
             }
        };fetchData();
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
                {/* sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <div 
                </aside>
            </div>
        </div>
    )
}