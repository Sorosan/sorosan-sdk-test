"use client"

import { useEffect } from 'react';
import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Button } from '@/components/ui/button';
import { Assert } from '@/lib/assert';
import { TestAttributes, TestStatusType, TestTemplate } from '@/components/test/test-template';

export interface TestCorrectNetworkProps
    extends React.HTMLAttributes<HTMLElement>, TestAttributes {
}

const testDescription = "it should be be connected to correct network (futurenet)"
export const TestCorrectNetwork = ({ run, status }: TestCorrectNetworkProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        try {
            Assert.isNotNull(sdk.selectedNetwork);
            Assert.equal(sdk.selectedNetwork.network, "FUTURENET");
            Assert.equal(sdk.selectedNetwork.networkPassphrase, "Test SDF Future Network ; October 2022");
            Assert.equal(sdk.selectedNetwork.networkUrl, "https://horizon-futurenet.stellar.org");
        } catch (error: any) {
            testStatus.status = "error";
            testStatus.error = error.message;
            console.log(error);
        }

        testStatus.time = new Date().getTime() - start.getTime();
        status((prev: TestStatusType[]) => [...prev, testStatus]);
    }

    return (
        <TestTemplate
            title={testDescription}
            run={run}
            status={status}
            runTest={runTest} />
    )
}