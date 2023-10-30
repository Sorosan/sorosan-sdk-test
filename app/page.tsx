"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Check, InfoIcon, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectWallet } from '@/components/shared/connect-wallet';
import { TestCorrectNetwork } from '@/components/test/basic/test-correct-network';
import { useEffect, useState } from 'react';
import { TestStatusType } from '@/components/test/test-template';
import { DeployWasmWithUserCancelWasm } from '@/components/test/contract/deploy-wasm-user-cancel';
import { DeployContractWasm } from '@/components/test/contract/deploy-wasm';
import { DeployEmptyWasm } from '@/components/test/contract/deploy-wasm-empty';
import { InvokeCallContractWithoutArgs } from '@/components/test/basic/invoke-call-contract-without-args';
import { InvokeCallContractWithArgs } from '@/components/test/basic/invoke-call-contract-with-args';
import { TestCasesTemplate } from "@/components/test/test-cases-template";
import { InvokeCallContractMismatchArgs } from "@/components/test/basic/invoke-call-contract-mismatch-args";
import { DeployInvalidWasm } from "@/components/test/contract/deploy-wasm-invalid-type";
import { InvokeSendContractWithoutArgs } from "@/components/test/basic/invoke-send-contract-without-args";
import { InvokeSendContractWithArgs } from "@/components/test/basic/invoke-send-contract-with-args";
import { InvokeSendContractMismatchArgs } from "@/components/test/basic/invoke-send-contract-mismatch-args";
import { NpmBtn } from "@/components/shared/npm-btn";
import { TokenDeploy } from "@/components/test/token/token-deploy";
import { TokenDeployAndInitialise } from "@/components/test/token/token-deploy-and-initialise";
import { TokenDeployWithWasmId } from "@/components/test/token/token-deploy-with-wasmid";
import { GetContractData } from "@/components/test/contract/get-contract-data";
import { InvokeCallContractWithInvalidMethod } from "@/components/test/basic/invoke-call-contract-with-invalid-method";
import { InvokeSendContractWithInvalidMethod } from "@/components/test/basic/invoke-send-contract-with-invalid-method";
import { InitialiseContractSuccessfully } from "@/components/test/contract/initialise-contract-successfully";
import { InitialiseContractInvalidMethod } from "@/components/test/contract/initialise-contract-invalid-method";
import { InitialiseContractTwice } from "@/components/test/contract/initialise-contract-twice";
import { DeployContractWasmWithInvalidPublicKey } from "@/components/test/contract/deploy-wasm-invalid-public-key";
import { DeployContract } from "@/components/test/contract/deploy-contract";
import { DeployContractInvalidWasm } from "@/components/test/contract/deploy-contract-invalid-wasm";
import { DeployContractEmptyWasm } from "@/components/test/contract/deploy-contract-empty-wasm";
import { DeployContractEmptyPublicKey } from "@/components/test/contract/deploy-contract-empty-public-key";
import Link from "next/link";

export default function Home() {
  const [testData, setTestData] = useState<TestStatusType[]>([]);
  const [totalTests, setTotalTests] = useState<TestStatusType[]>([]);

  useEffect(() => {
    const totalTests = TokenTests().length || 0 +
      BasicTests().length || 0 +
      ContractTests().length || 0
  }, []);

  const clearTestData = () => {
    setTestData([]);
  }

  const BasicTests = () => {
    return [
      <TestCorrectNetwork status={setTestData} />,
      <InvokeCallContractWithoutArgs status={setTestData} />,
      <InvokeCallContractWithArgs status={setTestData} />,
      <InvokeCallContractMismatchArgs status={setTestData} />,
      <InvokeSendContractWithoutArgs status={setTestData} />,
      <InvokeSendContractWithArgs status={setTestData} />,
      <InvokeSendContractMismatchArgs status={setTestData} />,
      <InvokeCallContractWithInvalidMethod status={setTestData} />,
      <InvokeSendContractWithInvalidMethod status={setTestData} />,
    ]
  }

  const ContractTests = () => {
    return [
      <DeployEmptyWasm status={setTestData} />,
      <DeployInvalidWasm status={setTestData} />,
      <DeployContractWasm status={setTestData} />,
      <DeployWasmWithUserCancelWasm status={setTestData} />,
      <DeployContractWasmWithInvalidPublicKey status={setTestData} />,
      <DeployContract status={setTestData} />,
      <DeployContractInvalidWasm status={setTestData} />,
      <DeployContractEmptyPublicKey status={setTestData} />,
      <DeployContractEmptyWasm status={setTestData} />,
      <GetContractData status={setTestData} />,
      <InitialiseContractSuccessfully status={setTestData} />,
      <InitialiseContractInvalidMethod status={setTestData} />,
      <InitialiseContractTwice status={setTestData} />,
    ]
  }

  const TokenTests = () => {
    return [
      <TokenDeploy status={setTestData} />,
      <TokenDeployWithWasmId status={setTestData} />,
      <TokenDeployAndInitialise status={setTestData} />
    ]
  }

  return (
    <div>
      <div className="flex items-center justify-between space-x-4 px-8 border-b">
        <div className="flex items-center space-x-2">
          <h2 className="font-bold text-2xl">Sorosan Wallet / UI Testing</h2>
          <div className="font-bold">
            Total Test: {" "}
            {TokenTests().length + BasicTests().length + ContractTests().length}
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <InfoIcon />
            </HoverCardTrigger>
            <HoverCardContent>
              Note: This test is not comprehensive in scope and 
              is intended solely for the purpose of testing UI 
              and wallet interactions. To access the remaining 
              tests, please refer to the following location: {" "}
              <Link className="w-full underline text-blue-500" href="https://github.com/Sorosan/sorosan-sdk/tree/master/src/sdk/__tests__"
                rel="noopener noreferrer" target="_blank">
                Github
              </Link>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="p-4 space-x-2">
          <ConnectWallet />
          <Button disabled={true}>Run All</Button>
          <Button onClick={clearTestData}>Clear</Button>
          <NpmBtn />
        </div>
      </div>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-4 border-r p-2">
          <TestCasesTemplate name="Basic Tests" tests={BasicTests()} />
          <TestCasesTemplate name="Contract Tests" tests={ContractTests()} />
          <TestCasesTemplate name="Token Tests" tests={TokenTests()} />
        </div>
        <div className="col-span-8">
          <Table>
            <TableCaption>{testData.length || 0} Total tests run</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Test Case</TableHead>
                <TableHead>Error</TableHead>
                <TableHead>Elapsed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testData && testData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex item-align-center">
                    {data.status === "success"
                      ? <Check className="text-green-500" />
                      : <XCircle className="text-red-500" />
                    }</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.error}</TableCell>
                  <TableCell>{data.time} ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
