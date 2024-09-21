export interface Repository {
    name: string
    readMe: string
    url: string
}

export interface UserRepositories {
    [key: string]: Repository
}