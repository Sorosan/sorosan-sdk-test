"use client"

import { useEffect, useState } from 'react';
import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Button } from '@/components/ui/button';
import { Assert } from '@/lib/assert';

// Defined a function that return promise of TestAttributes
// export const test = (): Promise<TestAttributes> => {
export interface TestStatusType {
    description: string;
    status: string;
    error?: string;
    time: number;
}

export interface TestAttributes {
    title?: string;
    run?: boolean;
    status: Function
}

export interface TestTemplateProps
    extends React.HTMLAttributes<HTMLElement>, TestAttributes {
    runTest: Function;
}

export interface TestCaseProps
    extends React.HTMLAttributes<HTMLElement>, TestAttributes {
}

export const TestTemplate = ({ title, run, runTest }: TestTemplateProps) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            (run) && (await onRunTest());
        })();
    }, []);

    const onRunTest = async () => {
        setIsRunning(true); // Set isRunning to true before running the test.

        try {
            await runTest(); // Assuming runTest is an asynchronous function.
        } catch (error) {
            // Handle any errors from runTest here.
        } finally {
            setIsRunning(false); // Set isRunning back to false when the test is finished.
        }
    }

    return (
        <div className="flex items-center justify-between space-x-4 px-8">
            <div>{title || "Test Case"}</div>
            <Button disabled={isRunning} onClick={onRunTest}>
                {isRunning ? "Testing ..." : "Run"}
            </Button>
        </div>
    )
}