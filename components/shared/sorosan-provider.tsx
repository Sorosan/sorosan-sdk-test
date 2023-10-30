"use client"

import React, { createContext, useContext, useState } from "react";
import {
    FUTURENET_DETAILS,
    SorosanSDK
} from "@sorosan-sdk/core";

/**
 * A provider component that wraps your application with the Soroban SDK.
 * It provides the Soroban SDK instance through context to be used by other components.
 *
 * @param {SorosanProviderProps} props - Props for the SorosanProvider component.
 * @returns {JSX.Element} The JSX element that represents the SorosanProvider component.
 */
export const SorosanProvider = ({ children }: SorosanProviderProps) => {
    const [sdk, _] = useState<SorosanSDK>(new SorosanSDK(FUTURENET_DETAILS));

    return (
        <SorosanContext.Provider value={{ sdk }}>
            {children}
        </SorosanContext.Provider>
    );
}

/**
 * @ignore
 * Interface for props that can be passed to the SorosanProvider component.
 */
interface SorosanProviderProps extends
    React.HTMLAttributes<HTMLElement> {
}

/**
 * @ignore
 * Context for storing the Soroban SDK instance.
 */
export const SorosanContext = createContext({
    sdk: new SorosanSDK(FUTURENET_DETAILS),
});

/**
 * @ignore
 * Hook for accessing the Soroban SDK instance from the context.
 * @returns {Object} An object containing the Soroban SDK instance.
 */
export const useSorosanSDK = () => useContext(SorosanContext);