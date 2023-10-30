"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";

const testDescription = "it should deploy wasm contract"
export const DeployContractWasm = ({ run, status }: TestCaseProps) => {
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
            const response = await fetch(`/api/wasm/token`, { method: "POST", });
            const wasm = await response.blob();
            const expectedWasmIdNotEqual = "";

            // Act
            let actualWasmId = await sdk.contract.deployWasm(wasm, sdk.publicKey);

            // Assert
            Assert.notEqual(expectedWasmIdNotEqual, actualWasmId);
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