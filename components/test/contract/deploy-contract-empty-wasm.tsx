"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";
import { TEST_WASM } from "@/lib/constants";

const testDescription = "it should throw an error when wasm provided is empty"
export const DeployContractEmptyWasm = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        try {
            // Arrange
            await sdk.login();

            // Assert
            await Assert.throwsAsync(async () => {
                await sdk.contract.deploy("", sdk.publicKey);
            });            
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