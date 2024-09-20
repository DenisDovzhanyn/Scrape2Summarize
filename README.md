# Scrape2Summarize

Scrape2Summarize is an automated web scraper that fetches all repositories from a given GitHub profile, extracts their README files, and generates a concise summary for each repository. This project is designed to autonomously maintain a portfolio by providing summaries, links, and repository names that can easily integrate with React components on a website. Once set up, the system requires minimal maintenance, as it updates automatically.

## How It Works

1. **Scrape Repositories:** The script scrapes a GitHub profile to gather a list of repository names.
2. **Fetch README Files:** For each repository, the script retrieves the README file.
3. **Summarize with ChatGPT:** Using OpenAI's GPT model, the script generates a summary of each README (or notes if no README is found).
4. **Autonomous Portfolio Updates:** The scraped data (repository name, summary, and link) can be used to update React components on a portfolio website, making future updates seamless and automatic.

## Key Features

- **Automated Scraping:** Fetches all repositories and README files from any specified GitHub profile.
- **AI-Powered Summaries:** Uses OpenAI’s GPT model to summarize README content in just a few sentences.
- **Seamless Integration:** Outputs repository names, summaries, and links in a format that can be easily consumed by front-end components (e.g., React).
- **Low Maintenance:** Once configured, the script will continue to update repository information autonomously.
