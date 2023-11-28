import React from "react";
import {createRoot } from "react-dom/client"
// import './style.scss';
import App from './App';

const container = document.querySelector('#app');
if (!container) throw new Error("HTML 檔中沒有定義 app 元件");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);