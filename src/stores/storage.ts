import superjson from 'superjson'
import {PersistStorage, StorageValue} from "zustand/middleware/persist";


class SuperJsonStorage<T> implements PersistStorage<T>{
    readonly storage: typeof localStorage
    constructor(storage) {
        this.storage = storage;
    }
    getItem(name: string) {
        const value = this.storage.getItem(name);
        if (!value) return null;
        return superjson.parse<StorageValue<T>>(value);
    }
    setItem(name: string, value: T){
        this.storage.setItem(name, superjson.stringify(value));
    }
    removeItem(name: string){
        this.storage.removeItem(name);
    }
}

export const storage = new SuperJsonStorage(localStorage);