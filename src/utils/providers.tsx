'use client'

import { ReactNode, useState } from 'react';
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Provider ({children}:{children:ReactNode}) {

    return (
            <QueryClientProvider client={new QueryClient()}>
                <ReactQueryDevtools initialIsOpen={false} />
                {children}
            </QueryClientProvider>
    )
    
}