createFooter();

function createFooter() {
    let leftFooter = document.getElementById("footer-container");
    let leftFooterContent = document.createElement('div');
    let empty = document.createElement('div');
    leftFooterContent.id = "left-footer";
    let leftWords = document.createElement('h1');
    leftWords.innerText = "Join the Movement";
    let sheCodes = document.createElement('img');
    sheCodes.src="https://pbs.twimg.com/profile_images/1148845221515423744/jhzRlR4m_400x400.png";
    let socialsBar = document.createElement('div');
    socialsBar.id ="socials-container";
    let twitterSocial = document.createElement('a');
    let twitterSocialImage = document.createElement('img');
    twitterSocialImage.classList.add('socials')
    twitterSocialImage.src = "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg"
    twitterSocial.href = "https://twitter.com/shecodesaus";
    let facebookSocial = document.createElement('a');
    let facebookSocialImage = document.createElement('img');
    facebookSocialImage.classList.add('socials')
    facebookSocialImage.src ="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";
    facebookSocial.href = "https://www.facebook.com/shecodesaustralia";
    twitterSocial.appendChild(twitterSocialImage);
    facebookSocial.appendChild(facebookSocialImage)
    socialsBar.appendChild(twitterSocial);
    socialsBar.appendChild(facebookSocial);
    leftFooterContent.appendChild(sheCodes);
    leftFooterContent.appendChild(empty);
    leftFooterContent.appendChild(leftWords);
    leftFooter.appendChild(leftFooterContent);
    leftFooter.appendChild(socialsBar)
};

