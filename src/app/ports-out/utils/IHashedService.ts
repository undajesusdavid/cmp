export default interface IHashedService {
    hash: (password: string) => Promise<string>;
    compare: (passwordPlain: string, passwordHashed: string) => Promise<boolean>;
}