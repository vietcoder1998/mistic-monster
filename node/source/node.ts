export default class INode {
    query: <T>(page: number, size: number) => Promise<T>
    write: <T>(data: T) => Promise<void>
    read: <T>(id: string, private_key: string) => Promise<T>
    delete: (id: string, private_key: string) => Promise<void>
}