"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";
import { TEST_WASM } from "@/lib/constants";

const testDescription = "it should be able to initialise a contract successfully after deploying wasm"
export const InitialiseContractSuccessfully = ({ run, status }: TestCaseProps) => {
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
            const args = [
                sdk.nativeToScVal(sdk.publicKey, "address"),
                sdk.nativeToScVal(18, "u32"),
                sdk.nativeToScVal("Token A"),
                sdk.nativeToScVal("AA"),
            ];
            const expectedContract = "";

            // Act
            const actualContract = await sdk.contract.deploy(TEST_WASM, sdk.publicKey);
            const contractAddress = await sdk.util.toContractAddress(actualContract);
            const isInitialised = await sdk.contract.initialise(contractAddress, "initialize", args);

            // Assert
            Assert.notEqual(expectedContract, actualContract);
            Assert.isTrue(isInitialised);
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