import React, { useState } from "react";
export default function CounterWithoutState() {
    let count = 7;
    console.log(count);
    return (
        <div id="wd-counter-use-state">
            <h2>CounterWithoutState: {count}</h2>
            <button
                onClick={() => { count++; console.log(count); }}
                id="wd-counter-up-click">
                Up
            </button>
            <button
                onClick={() => { count--; console.log(count); }}
                id="wd-counter-down-click">
                Down
            </button>
            <hr /></div>);
}

