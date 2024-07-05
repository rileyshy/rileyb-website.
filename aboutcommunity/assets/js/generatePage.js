document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const socialLinks = document.getElementById('socialLinks').value.split(',');

    // Create HTML content for the user page
    const userPageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${username}'s Page</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <div class="background-video">
        <video autoplay loop muted>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="overlay">
        <h1>${username}</h1>
        <div class="social-links">
            ${socialLinks.map(link => `<a href="${link.trim()}"><img src="../assets/img/icon.png" alt="Social Link"></a>`).join('')}
        </div>
    </div>
</body>
</html>
    `;

    // Convert the HTML content to base64
    const base64Content = btoa(unescape(encodeURIComponent(userPageContent)));

    // Fetch the token securely from the environment or a server endpoint
    const token = process.env.GH_TOKEN;

    if (!token) {
        console.error('Token is missing. Please set the GH_TOKEN environment variable.');
        return;
    }

    // Define GitHub repository details
    const repo = 'your-github-rileyshy/rileyb-website.'; // Replace with your repository
    const path = `aboutcommunity/pages/${username}.html`;

    // Debugging: log the URL and path to check if they are correct
    console.log(`Requesting: https://api.github.com/repos/${repo}/contents/${path}`);
    console.log(`Token: ${token ? 'Present' : 'Missing'}`);
    console.log(`Content Length: ${base64Content.length}`);

    // Create GitHub API request to upload the file
    fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Add ${username} page`,
            content: base64Content
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }
    }).then(data => {
        if (data.content && data.content.html_url) {
            alert(`Page created: ${data.content.html_url}`);
        } else {
            console.error('Error creating page:', data);
        }
    }).catch(error => console.error('Error:', error));
});
