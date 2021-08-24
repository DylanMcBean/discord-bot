const Discord = require('discord.js');
//https://www.npmjs.com/package/fuzzy
module.exports =  {sortingAlgs};

languageExtensions = {
    "python":"py",
    "javascript":"js",
    "c++":"cpp",
    "cplusplus":"cpp"
}

languageExtendedVersions = {
    "py":"python",
    "js":"javascript",
}

function sortingAlgs(message,language,algorithm){
    let convertedExtension = Object.keys(languageExtensions).includes(language) ? languageExtensions[language] : language;
    let convertedLanguage = Object.keys(languageExtendedVersions).includes(convertedExtension) ? languageExtendedVersions[convertedExtension] : convertedExtension;

    if (language != null)
        message.channel.send(new Discord.MessageAttachment(`./files/${algorithm}/${algorithm} ${convertedLanguage}.${convertedExtension}`));
    else
        message.channel.send(new Discord.MessageAttachment(`./files/${algorithm}/information.png`));
}