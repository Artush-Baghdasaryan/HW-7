export interface IBook {
    id: string,
    userId: string,
    name: string,
    author: string,
}

export interface IAddBook {
    author: string,
    name: string
}

export interface IEditBook {
    author: string,
    name: string
}

export interface IBookDto {
    id: string,
    userId: string,
    author: string,
    name: string
}