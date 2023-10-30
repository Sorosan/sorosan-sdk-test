"use client"

import { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TestCasesProps
    extends React.HTMLAttributes<HTMLElement> {
    name: string,
    tests: React.ReactNode[]
}

export const TestCasesTemplate = ({ name, tests }: TestCasesProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className="flex space-x-3 rounded-lg 
          hover:bg-stone-50 p-2 w-full font-bold">
                {isOpen ? <ChevronRight /> : <ChevronDown />}
                <div>{name}</div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
                {tests.map((test, index) => {
                    return (
                        <div key={index}>{test}</div>
                    )
                })}
            </CollapsibleContent>
        </Collapsible>
    )
}