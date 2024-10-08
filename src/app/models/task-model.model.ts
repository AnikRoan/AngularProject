export interface Task {
    id: number
    project: string
    description: string
    // date: Date
    date: string | Date | null
    time: string
   
   }