"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";
import { TEST_WASM } from "@/lib/constants";

const testDescription = "it should throw an error when using a invalid initialisation method";
export const InitialiseContractInvalidMethod = ({ run, status }: TestCaseProps) => {
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
            await sdk.connectWallet();
            
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
            await Assert.throwsAsync(async () => {
                await sdk.contract.initialise(contractAddress, "initializzze", args)
            });

            // Assert
            Assert.notEqual(expectedContract, actualContract);
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