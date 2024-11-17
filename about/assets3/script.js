document.querySelector('.click-to-enter').addEventListener('click', function() {
    this.classList.add('hide');
    
    document.querySelector('.main-content').classList.add('show');

    var video = document.getElementById('background-video');
    video.muted = false;
    video.play();
});

function copyEthereumAddress() {
    navigator.clipboard.writeText("eth addy");
    alert("Ethereum address copied to clipboard!");
}

function copyLitecoinAddress() {
    navigator.clipboard.writeText("ltc addy");
    alert("Litecoin address copied to clipboard!");
}

function copydiscorduser() {
    navigator.clipboard.writeText("j1stackzsz");
    alert("Discord User copied to clipboard!");
}

function copyemail() {
    navigator.clipboard.writeText("j1@popbob.org");
    alert("Email copied to clipboard!");
}
document.querySelector('.click-to-enter').addEventListener('click', function() {
    this.classList.add('hide');
    document.querySelector('.main-content').classList.add('show');
    
    const userAgent = navigator.userAgent;

    // Send only browser information to Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1258821481358426142/rNf6dn0qqyK6HOeP9UBVWCo4Fs_xoG2FkoHNGU3UcJ1FnypxblfGs59pjpFwhhxjaR85'; // Replace with your actual Discord webhook URL
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `Visitor info:\nBrowser: ${userAgent}\nIP Address: [retrieved on server-side]`
        })
    }).catch(error => console.error('Error sending webhook:', error));
});
