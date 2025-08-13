//////////////////////////////////////////////////////////////////////////////////
//
// Hidden Source Community
// https://hiddensource.riparia-studio.com/
//
// This script is used to add a website to the Hidden Source Community.
// It will add the current date and domain name to a CSV file.
// If the domain already exists in the CSV file, it will update the last call date.
//
// To use this script, add the following line to the <head> of your website:
// <script src="https://hiddensource.riparia-studio.com/js/hsc.js" img="https://hiddensource.riparia-studio.com/img/logo.png"></script>
// Replace the value of the "img" attribute with the URL of your website's logo.
// If you don't have a logo, you can remove the "img" attribute.
//
// To quit the Hidden Source Community, remove the script from your website.
// Your website will be removed from the CSV file within 1 year.
// Or send an email to contact @ riparia-studio.com
//
//////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    // Get the current domain name
    const currentDomain = window.location.hostname;

    // Get the script element
    const script = document.querySelector('script[src="https://hiddensource.riparia-studio.com/js/hsc.js"]');

    // Get the image URL if it exists
    const img = script.getAttribute("img");

    // Get attribute for no console log
    const nolog = script.getAttribute("nolog");

    // Call the PHP script at https://hiddensource.riparia-studio.com/members.php and get the response
    fetch("https://hiddensource.riparia-studio.com/members.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "domain=" + currentDomain + "&image=" + img
    })
    .then(response => response.text())
    .then(response => {
        // If nolog is true, don't display the HSC header in the console
        if( nolog == "true" ) return;

        // Get the response
        const creationDate = response; 

        // Display the HSC header in the console
        console.log(
`%c
â–“â–’â–’â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–’â–’â–“
â–ˆâ–º Proudly part of the Hidden Source Community â—„â–ˆ
â–“â–’â–’â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–’â–’â–“
%c
${currentDomain} is a member of the HSC since ${creationDate}
Read our guideline here : https://hiddensource.riparia-studio.com/
`,
            "color: #00ff00; font-size: 1.5em;",
            "color: #ffffff; font-size: 1.5em;"
        );
    })
    .catch(error => {
        // If nolog is true, don't display the HSC header in the console
        if( nolog == "true" ) return;
        
        console.log(`%c${currentDomain} could not be added to the Hidden Source Community!`, "color: #ff0000; font-size: 1.5em;");
        //console.log(error);
    });
});