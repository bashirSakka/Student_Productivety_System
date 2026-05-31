import  { useState, useEffect } from "react";

export default function Pomodoro() {
    const TIMERS = {
  work: 20,        // 1500 seconds
  shortBreak: 5 ,   // 300 seconds
  longBreak: 15     // 900 seconds
}

    const [count, setCount] = useState(TIMERS.work);
    const [round, setRound] = useState(1);
    const [session, setSession] = useState("work") 
    const [isActive, setIsActive] = useState(false);

      useEffect(() => {
        if(!isActive) return;
  const interval = setInterval(() => {
    setCount(prev => {
      if (prev <= 1) {
       if (session === "work") {
        setSession("shortBreak");
        return TIMERS.shortBreak;
        
       }
       if (session === "shortBreak") {
        if(round/4!=0){
   setSession("work");
        setRound(prev => prev + 1);
        return TIMERS.work;
        }else{
            setSession("longBreak");
            setRound(1);
        return TIMERS.longBreak;

        }
     
       }if(session==="longBreak"){
        setSession("work");
        return TIMERS.work;
       }

        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(interval)
}, [session, round,isActive])
 const minutes = Math.floor(count / 60)
const seconds = count % 60

return (
    <div>
        <h1>{session === "work" ? "Work Time" : session === "shortBreak" ? "Short Break" : "Long Break"}</h1>
        <h2>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</h2>
        <button onClick={() => setIsActive(true)}>Start</button>
        <button onClick={() => setIsActive(false)}>Pause</button>
    </div>
)
};
