"use client"

import { useSorosanSDK } from "@/components/shared/sorosan-provider";
import { Assert } from "@/lib/assert";
import { TEST_TOKEN_CONTRACT } from "@/lib/utils";
import { TestCaseProps, TestStatusType, TestTemplate } from "@/components/test/test-template";

const testDescription = "it should throw an error when call for a valid contract but incorrect parameters provided";
export const InvokeCallContractMismatchArgs = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        await sdk.login();
        const args = [
            sdk.nativeToScVal(sdk.publicKey, "address"),
            sdk.nativeToScVal(sdk.publicKey, "address"),
            sdk.nativeToScVal(sdk.publicKey, "address"),
        ];

        await Assert.throwsAsync(async () => {
            await sdk.call(TEST_TOKEN_CONTRACT, "balance", args)
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
