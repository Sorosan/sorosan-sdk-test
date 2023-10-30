"use client";

import { useEffect, useState } from 'react';
import { useSorosanSDK } from '../shared/sorosan-provider';

export interface HeaderProps
    extends React.HTMLAttributes<HTMLElement> {
}

export const Header = ({}: HeaderProps) => {
    const { sdk } = useSorosanSDK();
    
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!sdk) {
            return;
        }

        setLoaded(true);
        console.log(sdk);
    }, []);
    
    if (!loaded) {
        return (
            <div>Error Loading SDK!</div>
        )
    }
    return (
        <div>SDK loaded</div>
    )
}