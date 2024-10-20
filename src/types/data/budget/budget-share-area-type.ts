export interface GetSingleBudgetShareAreaItemShape {
    id: number,
    areaId: number,
    yearId: number,
    shareProcessId1: number,
    shareProcessId2: number,
    shareProcessId3: number,
    shareProcessId4: number,
    area: {
        id: number
        areaName: string
    }
}
