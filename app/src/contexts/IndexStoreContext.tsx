import React from 'react'
import { useLocalStore } from 'mobx-react'
import {createIndexStore, TIndexStore} from "../stores/IndexStore"; // 6.x or mobx-react-lite@1.4.0

const storeContext = React.createContext<TIndexStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(createIndexStore)
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useIndexStore = () => {
    const store = React.useContext(storeContext)
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a StoreProvider.')
    }
    return store
}