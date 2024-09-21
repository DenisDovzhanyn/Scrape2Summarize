import { getUserRepositories } from './services/github.service';
import { Repository, UserRepositories } from './types/github';
import { getSummarizedUserRepos } from './services/openai.service';

const userRepos: UserRepositories = await getUserRepositories(process.env.SHOULD_SCRAPE === 'true');
console.log(userRepos);
const userReposWithSummary: UserRepositories = await getSummarizedUserRepos(userRepos);

console.log(userReposWithSummary);

export{
    
}