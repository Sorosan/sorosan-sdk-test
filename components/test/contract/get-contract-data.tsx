"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";
import { TEST_CONTRACT, TEST_WASM } from "@/lib/constants";

const testDescription = "it should be able to get contract data from valid contract"
export const GetContractData = ({ run, status }: TestCaseProps) => {
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
            const expectedContractWasm = TEST_WASM;

            const actualContractData = await sdk.contract.getContractData(TEST_CONTRACT);
            if (!actualContractData) {
                throw new Error("Data not found");
            }
            console.log(actualContractData);
            const actualContractWasm = actualContractData.wasmId.toString("hex");
      
            // Assert
            Assert.isNotNull(actualContractData);
            Assert.equal(expectedContractWasm, actualContractWasm);
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