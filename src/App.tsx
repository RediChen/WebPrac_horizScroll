import React from "react";
import MoveWidthwise from "./MoveWidthwise";
import TestComponent from "./TestComponent";

const App = () => {
    return (
        <div className="container" style={{backgroundColor: "#aaa"}}>
            <h1 style={{ textAlign: "center" }}>橫向捲軸實作</h1>
            <p style={{ textAlign: "center", margin: "2rem 0" }}>
                ↓↓↓請往下捲動↓↓↓
            </p>
            <MoveWidthwise contentComponent={TestComponent()}></MoveWidthwise>
            <div
                style={{
                    // margin: "-4px",
                    height: "20vh",
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#131",
                    color: "white",
                }}
            >
                <div>橫向展示結束</div>
            </div>
        </div>
    );
};

export default App;
