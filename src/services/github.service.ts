import parser from 'node-html-parser';
import { Repository } from '../types/github';
import { UserRepositories } from '../types/github';

const PROFILE_URL: string = `https://github.com/${process.env.PROFILE}?tab=repositories`;
const GITHUB_API_BASE_URL: string = 'https://api.github.com';

export const getUserRepositories = async (shouldScrape: boolean): Promise<UserRepositories> => 
    await getUserRepositoriesByName(await (shouldScrape ? scrapeRepoNames : apiRepoNames)())

const scrapeRepoNames = async (): Promise<string[]> => {
    const response : Response = await fetch(PROFILE_URL);
    const responseFromProfile : string = await response.text();
    console.log(responseFromProfile)
    const root = await parser.parse(responseFromProfile);

    const singledOutElements = await root.querySelectorAll('a[itemprop="name codeRepository"]')
    console.log(singledOutElements)
    const repoNames : string[] = singledOutElements.map((element) => (element.textContent ?? '').trim());
    console.log(repoNames)
    return repoNames;
}

const apiRepoNames = async (): Promise<string[]> => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `${process.env.GITHUB_API_KEY}`)
    const apiResponse: Response = await fetch(`${GITHUB_API_BASE_URL}/users/${process.env.PROFILE}/repos`, {
        headers: requestHeaders
    });
    return (await apiResponse.json()).map(({ title }: any) => title) 
}


const getUserRepositoriesByName = async (repoNames: string[]): Promise<UserRepositories> => {
    console.log('sup', repoNames)
    return (await Promise.all(
        repoNames.map(async (name) => {
            const responseFromReadMe : Response = await fetch(`https://raw.githubusercontent.com/${process.env.PROFILE}/${name}/main/README.md`);
            
            if (!responseFromReadMe.ok) {
                return { 
                    name,
                    readMe:  '',
                    url: `https://github.com/${process.env.PROFILE}/${name}`
                };
            }
            
            const readMe : string = await responseFromReadMe.text();
            return {
                name, 
                readMe,
                url: `https://github.com/${process.env.PROFILE}/${name}`
            };
        })
    ))
    .reduce((acc: UserRepositories, repo: Repository): UserRepositories => ({
        ...acc, 
        [repo.name]: repo
    }), {})
}






