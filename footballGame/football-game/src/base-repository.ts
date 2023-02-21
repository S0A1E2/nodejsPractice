import fs from 'fs';

export class BaseRepository<T> {
    private readonly dbPath!: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    async getAll(): Promise<T[]> {
        const data = await fs.promises.readFile(this.dbPath, 'utf-8');
        return JSON.parse(data) as T[];
    }

    async getById(id: number): Promise<T | undefined> {
        const data = await this.getAll();
        return data.find((item) => item['id'] === id);
    }
}