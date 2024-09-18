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


const repoReadMes : string[] = await Promise.all(
    repoNames.map(async (name) => {
        const responseFromReadMe : Response = await fetch(`https://raw.githubusercontent.com/DenisDovzhanyn/${name}/main/README.md`);

        if (!responseFromReadMe.ok) {
            return '';
        }

        const readMeContent : string = await responseFromReadMe.text();
        return readMeContent;
    })
)

repoReadMes.filter((readme) => readme !== '');

console.log(repoReadMes);

export{
    
}