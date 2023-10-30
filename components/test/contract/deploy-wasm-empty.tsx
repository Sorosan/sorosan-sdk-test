"use client"

import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Assert } from '@/lib/assert';
import { TestCaseProps, TestStatusType, TestTemplate } from '@/components/test/test-template';

const testDescription = "it should throw an error when wasm is empty"
export const DeployEmptyWasm = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        await sdk.login();
        const wasm = new Blob();

        await Assert.throwsAsync(async () => {
            await sdk.contract.deployWasm(wasm, sdk.publicKey)
        });

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
