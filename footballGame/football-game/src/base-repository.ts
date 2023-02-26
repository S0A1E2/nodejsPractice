import fs from 'fs';

interface Item {
    id?: number;
    [key: string]: any;
}
export class BaseRepository<T extends Item> {
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

    async create(item: T): Promise<void> {
        const data = await this.getAll();
        data.push(item);
        await fs.promises.writeFile(this.dbPath, JSON.stringify(data));
    }

    async update(id: number, item: T): Promise<void> {
        const data = await this.getAll();
        const index = data.findIndex((item) => item['id'] === id);
        if(index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        data[index] = item;
        await fs.promises.writeFile(this.dbPath, JSON.stringify(data));
    }

    async delete(id: number) {
        const data = await this.getAll();
        const filterData = data.filter((item) => item['id'] !== id);
        await fs.promises.writeFile(this.dbPath, JSON.stringify(filterData));
    }
}