import React from "react";
const TestComponent = () => (
    <div style={{ display: "flex", width: "400vw" }}>
        <div
            style={{
                height: "100vh",
                flex: "0 0 25%",
                backgroundColor: "pink",
                // display: "flex",
                // alignContent: "center",
                // justifyContent: "center",
                // fontSize: "10rem",
            }}
        >
            test1
        </div>
        <div
            style={{
                height: "100vh",
                flex: "0 0 25%",
                backgroundColor: "orange",
            }}
        >
            test2
        </div>
        <div
            style={{
                height: "100vh",
                flex: "0 0 25%",
                backgroundColor: "lightgoldenrodyellow",
            }}
        >
            test3
        </div>
        <div
            style={{
                height: "100vh",
                flex: "0 0 50%",
                backgroundColor: "green",
                fontSize: "6rem",
            }}
        >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
    </div>
);

export default TestComponent;
