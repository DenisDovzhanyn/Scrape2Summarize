import { UserRepositories, Repository } from "../types/github";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.apikey}); 

export const getSummarizedUserRepos = async (userRepos: UserRepositories): Promise<UserRepositories> => (await Promise.all(
    Object.entries(userRepos).map(async ([name, {readMe, url}]) => {
        const aiResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
            role: 'system',
            content: 'You will shorten any given readme to about 4-5 sentences, if the readme is empty simply return that no readme was found'
        },
        {
            role: 'user',
            content: readMe
        }]})

        return {
            name,
            readMe: aiResponse.choices[0].message.content || '',
            url
        }

    }))
    
).reduce((acc: UserRepositories, repo: Repository) => ({
    ...acc,
    [repo.name]: repo
}), {});
