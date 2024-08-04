import axios from "axios";
import socketIOClient from "socket.io-client";
import AdminAnalyticsPageComponent from "./components/AdminAnalyticsPageComponent";
const fetchOrdersForFirstDate= async(abctrl, firstDateToCompare)=>{
  const{data}= await axios.get("/api/v1/orders/analysis/"+firstDateToCompare,{
    signal: abctrl.signal
  })
  return data;
}
const fetchOrdersForSecondDate= async(abctrl, secondDateToCompare)=>{
  const{data}= await axios.get("/api/v1/orders/analysis/"+secondDateToCompare,{
    signal: abctrl.signal
  })
  return data;
}
export default function AdminAnalyticsPage() {
  return <AdminAnalyticsPageComponent
    fetchOrdersForFirstDate={fetchOrdersForFirstDate}
    fetchOrdersForSecondDate={fetchOrdersForSecondDate}
    socketIOClient={socketIOClient}
  />
}
