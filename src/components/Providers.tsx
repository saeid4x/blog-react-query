"use client"

import { ReactNode } from 'react'
import {QueryClientProvider,QueryClient} from 'react-query'

interface ProvidersProps {
    children: ReactNode
}

const queryClient = new QueryClient();
const Providers:React.FC<ProvidersProps> = ({children}) => {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}

export default Providers