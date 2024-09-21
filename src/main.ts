import { getUserRepositories } from './services/github.service';
import { Repository, UserRepositories } from './types/github';
import { getSummarizedUserRepos } from './services/openai.service';
import { uploadToS3 } from './services/aws.service';

export const handler = async (event: any) => {

    const userRepos: UserRepositories = await getUserRepositories(process.env.SHOULD_SCRAPE === 'true');

    const userReposWithSummary: UserRepositories = await getSummarizedUserRepos(userRepos);

    await uploadToS3(userReposWithSummary);

}


