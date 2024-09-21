export interface Repository {
    name: string
    readMe: string
    url: string
    socialPreviewUrl?: string
}

export interface UserRepositories {
    [key: string]: Repository
}