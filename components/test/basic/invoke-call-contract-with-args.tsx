"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TEST_TOKEN_CONTRACT } from "@/lib/utils";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";

const testDescription = "it should successfully invoke a contract call for a valid contract with parameters provided";
export const InvokeCallContractWithArgs = ({ run, status }: TestCaseProps) => {
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
            ];
            const expectedBalance: bigint = BigInt(0);

            // Act
            const actualBalance: bigint = await sdk.call(TEST_TOKEN_CONTRACT, "balance", args);

            // Assert
            Assert.equal(expectedBalance, actualBalance);
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
