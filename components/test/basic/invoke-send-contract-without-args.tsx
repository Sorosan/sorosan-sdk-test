"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TEST_TOKEN_CONTRACT } from "@/lib/utils";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";

const testDescription = "it should successfully invoke a contract send for a valid contract without any parameters";
export const InvokeSendContractWithoutArgs = ({ run, status }: TestCaseProps) => {
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
            const expectedTokenName = "Token A";

            // Act
            const actualTokenName: any = await sdk.send(TEST_TOKEN_CONTRACT, "name");

            // Assert
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
