"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSorosanSDK } from "./sorosan-provider";
import { getPublicKey } from "@stellar/freighter-api";
// import { getPublicKey } from "@stellar/freighter-api";

export interface ConnectWalletProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const ConnectWallet = ({ }: ConnectWalletProps) => {
    const { sdk } = useSorosanSDK();

    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        (async () => {
            await sdk.login();  // Attempt to restore login 
            const address = await sdk.publicKey;
            setAddress(address);
        })();
    }, []);

    const handleConnect = async () => {
        try {
            const logged = await sdk.login();
            const connected = await sdk.connectWallet();
            const publicKey = await getPublicKey();
            if (!publicKey) {
                return;
            }

            const address = await sdk.publicKey || publicKey;
            console.log(logged, connected, address);
            setAddress(address);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button onClick={handleConnect}>
            {address ? sdk.util.mask(address) : "Connect Wallet"}
        </Button>
    )
}