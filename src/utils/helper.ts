import logger from "./logger";

export class Helper {
    public static removeIdFromRecords(records: Array<any>) {
        for (const record of records) {
            Helper.removeIdFromRecord(record);
        }
    }

    public static removeIdFromRecord(record: any) {
        delete record.id;
        record.isDeleted && delete record.isDeleted;
    }
    public static removePassword(record: any) {
        delete record.password;
        record.isDeleted && delete record.isDeleted;
    }

    public static getUniqueReference(prefix: string) {
        return `${prefix}${(Date.now().toString(36) + Math.random().toString(36).substring(2)).toUpperCase()}`;
    }

    public static paginate(Model: any, page: number, size: number, conditions: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const pageToUse = Number(page) - 1;
                const pageSizeToUse = Number(size);
                const recordsToSkip = pageToUse * pageSizeToUse;
                const data: any[] = await Model.findMany({
                    skip: recordsToSkip,
                    take: pageSizeToUse,
                    ...conditions,
                    orderBy: {
                        updatedAt: "desc"
                    },
                });
                Helper.removeIdFromRecords(data);
                delete conditions.include;
                const numberOfRecords = data.length ? await Model.count({ ...conditions }) : 0;
                const totalPages = numberOfRecords > 0 ? Math.ceil(numberOfRecords / pageSizeToUse) : 1;
                resolve({ total: numberOfRecords, count: data.length, data, totalPages, currentPage: pageToUse + 1 });
            } catch (error) {
                logger.info(error);
                reject(error); 
            }
        });
    }
}