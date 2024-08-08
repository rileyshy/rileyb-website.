document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const webhookURL = 'https://discord.com/api/webhooks/1258821481358426142/rNf6dn0qqyK6HOeP9UBVWCo4Fs_xoG2FkoHNGU3UcJ1FnypxblfGs59pjpFwhhxjaR85'; // Replace with your Discord webhook URL

        const payload = {
            content: `New contact form submission:\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            alert('Your message has been sent!');
            form.reset(); // Clear the form fields
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Your message has been sent! you will get a reply asap on email');
        });
    });
});
