import React, { useEffect } from "react";
import EthnicList from "./EthnicList";
import { pagingEthnicities } from "./EthnicsService";

function EthnicsIndex() {
    return (
        <>
            <EthnicList />
        </>
    );
}

export default EthnicsIndex;
