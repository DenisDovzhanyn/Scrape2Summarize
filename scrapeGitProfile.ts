const profile : string = 'https://github.com/DenisDovzhanyn?tab=repositories';
import parser from 'node-html-parser';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const htmlFromProfile = async (userProfile : string) => {
    const response : Response = await fetch(userProfile);
    const html : string = await response.text();
    return html;
}

const getRepoNames = async () => {
    const responseFromProfile = await htmlFromProfile(profile);
    const root = await parser.parse(responseFromProfile);

    const singledOutElements = await root.querySelectorAll('a[itemprop="name codeRepository"]')
    
    const repoNames : string[] = singledOutElements.map((element) => (element.textContent ?? '').trim());

    return repoNames;

}

const repoNames : string[] = await getRepoNames();

const unfilteredRepoReadMes : string[] = await Promise.all(
    repoNames.map(async (name) => {
        const responseFromReadMe : Response = await fetch(`https://raw.githubusercontent.com/DenisDovzhanyn/${name}/main/README.md`);

        if (!responseFromReadMe.ok) {
            return '';
        }

        const readMeContent : string = await responseFromReadMe.text();
        return readMeContent;
    })
)

const repoReadMes = unfilteredRepoReadMes.filter((readme) => readme !== '');

const openai = new OpenAI({ apiKey: process.env.apikey}); 

const consumeOpenAi : string[] = await Promise.all(
    repoReadMes.map(async (readMe) => {
        const aiResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
            role: 'system',
            content: 'You will shorten any given readme to about 4-5 lines'
        },
        {
            role: 'user',
            content: readMe
        }]})

        return aiResponse.choices[0].message.content || '';
    })
)

console.log(consumeOpenAi);

export{
    
}