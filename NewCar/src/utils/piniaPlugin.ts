import { PiniaPluginContext } from "pinia"
import { toRaw } from "vue"

type Options = {
    key?: string
}

const _piniaKey: string = 'muran'

const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}

export const piniaPlugin = (options: Options) => {
    return (context: PiniaPluginContext) => {
        const { store } = context

        const persist = store.$state.persist ?? false
        if (!persist) return

        const data = getStorage(`${options?.key ?? _piniaKey}-${store.$id}`)

        store.$subscribe(() => {
            setStorage(`${options?.key ?? _piniaKey}-${store.$id}`, toRaw(store.$state))
        })

        return {
            ...data
        }
    }
}