"use client"

import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Assert } from '@/lib/assert';
import { TestCaseProps, TestStatusType, TestTemplate } from '@/components/test/test-template';

const testDescription = "it should successfully deploy a smart token contract and initialise"
export const TokenDeployAndInitialise = ({ run, status }: TestCaseProps) => {
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
            const expectedTokenContract = "";
            const expectedTokenName = "Token A";

            // Act
            const actualTokenContractId = await sdk.token.deploy();
            const actualTokenContract = await sdk.util.toContractAddress(actualTokenContractId);
            const isInitialised = await sdk.token.initialise(
                actualTokenContract, expectedTokenName, "AA", 18);
            const actualTokenName = await sdk.token.name(actualTokenContract);

            // Assert
            Assert.notEqual(expectedTokenContract, actualTokenContract);
            Assert.isTrue(isInitialised);
            Assert.equal(expectedTokenName, actualTokenName);
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