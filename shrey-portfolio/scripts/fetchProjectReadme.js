
export async function fetchProjectReadme(repository, githubToken) {
    const url =
        `https://api.github.com/repos/${repository.full_name}/readme`;

    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/vnd.github.raw+json",
                ...(githubToken && {
                    Authorization: `Bearer ${githubToken}`,
                }),
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            console.warn(
                `README unavailable for ${repository.name}: ${response.status}`
            );
            return "";
        }

        return await response.text();
    } catch (error) {
        console.warn(
            `Could not fetch README for ${repository.name}: ${error.message}`
        );
        return "";
    }
}
