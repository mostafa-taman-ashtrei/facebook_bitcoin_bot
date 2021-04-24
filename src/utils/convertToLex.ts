import wordDict from './wordDict';

const convertToLex = (text: string) => {
    const words = text.split(' ');

    words.forEach((word, i) => {
        Object.keys(wordDict).forEach((key) => {
            if (key === word.toLowerCase()) {
                words[i] = wordDict[key];
            }
        });
    });

    return words.join(' ');
};

export default convertToLex;
