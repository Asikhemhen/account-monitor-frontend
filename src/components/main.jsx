// src/components/Main.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTradingData } from "../redux/dataSlice";

const Main = () => {
  const dispatch = useDispatch();
  const tradingData = useSelector((state) => state.tradingData.tradingData);

  useEffect(() => {
    const fetchTradingData = async () => {
      try {
        const response = await axios.get("/api/trading-data"); // Adjust the endpoint as needed
        dispatch(setTradingData(response.data));
      } catch (error) {
        console.error("Error fetching trading data:", error);
      }
    };

    fetchTradingData();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Trading Dashboard</h1>
      <ul className="space-y-4">
        {tradingData.map((data, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">{data.account_name}</p>
            <p>Balance: ${data.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
