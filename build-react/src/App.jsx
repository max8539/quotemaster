import React from 'react';
import styled from "styled-components";

import "./index.css"
import { RouterView } from "./router.jsx";
import * as config from "./config.js";

const Header = styled.h1`
    font-family: "Tahoma", sans-serif;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
`

const BuildInfo = styled.p`
    font-family: "Tahoma", sans-serif;
    text-align: center;
`

const ContentArea = styled.div`
    width: 360px;
    margin: 0 auto;
`

const NoApi = styled.div`
    width: 340px;
    padding: 10px;
    align-items: center;
    background-color: #ffaaaa;
    margin: auto;
    font-family: "Tahoma", sans-serif;
    text-align: center;
`

async function doHandshake (updateStateFunc) {
    let handshake;
    try {
        handshake = await fetch(`${config.API_HOST}/handshake`);
        if (handshake.ok) {
            return updateStateFunc(true);
        } else {
            return updateStateFunc(false);
        }
    } catch {
        return updateStateFunc(false);
    }
}

function Content () {
    const [apiOnline, apiOnlineUpdate] = React.useState(true);
    React.useEffect(() => {doHandshake(apiOnlineUpdate)},[]);

    if (apiOnline) {return (
        <ContentArea>
            <RouterView />
        </ContentArea>
    )} else {return (
        <NoApi>
            <p>Unable to reach API server.</p>
            <div className="button-container">
                <button onClick={() => {doHandshake(apiOnlineUpdate)}}>Retry</button>
            </div>
        </NoApi>
    )}
}

// 
export default function App () {return (
    <div>
        <Header>Quotemaster</Header>
        <BuildInfo>React build v0.1.0</BuildInfo>
        <BuildInfo><a href="https://github.com/max8539/quotemaster/tree/main/build-react">View source on Github</a></BuildInfo>
        <Content />
    </div>
)};
