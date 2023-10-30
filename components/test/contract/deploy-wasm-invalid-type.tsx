"use client"

import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Assert } from '@/lib/assert';
import { TestCaseProps, TestStatusType, TestTemplate } from '@/components/test/test-template';

const testDescription = "it should throw an error when wasm is invalid"
export const DeployInvalidWasm = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        await sdk.login();
        const wasm = new Blob(["invalid wasm"], { type: "application/wasm" });

        await Assert.throwsAsync(async () => {
            await sdk.contract.deployWasm(wasm, sdk.publicKey)
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

// it("should throw an error with 'Expected \'application/wasm\'' message if wasm is not of the correct type",
// async () => {
//   const sdk = new ContractSDK(DEFAULT_NETWORK, TEST_PUBLIC_KEY);
//   const wasmBuffer = fs.readFileSync("asset/soroban_token_contract.wasm");
//   const wasmBlob = new Blob([wasmBuffer], { type: "application/json" });

//   await expect(sdk.deployWasm(wasmBlob, TEST_PUBLIC_KEY))
//     .rejects
//     .toThrow("Expected 'application/wasm'");
// });