const profile : string = 'https://github.com/DenisDovzhanyn?tab=repositories';
import parser from 'node-html-parser';

const htmlFromProfile = async (userProfile : string) => {
    const response : Response = await fetch(userProfile);
    const html : string = await response.text();
    return html;
}

async function getRepoNames() {
    const responseFromProfile = await htmlFromProfile(profile);
    const root = await parser.parse(responseFromProfile);

    const singledOutElements = await root.querySelectorAll('a[itemprop="name codeRepository"]')
    
    const repoNames : string[] = singledOutElements.map((element) => (element.textContent ?? '').trim());

    return repoNames;

}

const repoNames : string[] = await getRepoNames();

console.log(repoNames);

export{
    
}