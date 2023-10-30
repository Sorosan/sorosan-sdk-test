"use client"

import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Assert } from '@/lib/assert';
import { TestCaseProps, TestStatusType, TestTemplate } from '@/components/test/test-template';

// This test requires user to cancel the transaction (Reject when Freighter asks for approval)
const testDescription = "it should cancel the transaction when user cancel the transaction"
export const DeployWasmWithUserCancelWasm = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    // useEffect(() => {
    //     (async () => {
    //     })();
    // }, [run]);

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
            const response = await fetch(`/api/wasm/token`, { method: 'POST', });
            const wasm = await response.blob();
            const expectedWasmId = "";

            // Act
            let actualWasmId: string = "";
            try {
                actualWasmId = await sdk.contract.deployWasm(wasm, sdk.publicKey);
            } catch (error) {
                console.log(error);
            }

            // Assert
            Assert.equal(expectedWasmId, actualWasmId);
        } catch (error: any) {
            testStatus.status = "error";
            testStatus.error = error.message;
            Assert.isNotNull(error);
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
