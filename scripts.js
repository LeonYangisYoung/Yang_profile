// scripts.js

window.onload = function() {
    console.log("scripts.js页面加载完成！");
    console.log("window.onload 已执行");
    alert("欢迎来到杨的个人网站！网站依旧在开发中，不代表最终品质。");

    displayRandomQuote();
};

const quotes = [
    "I’ve become your shadow, your misery was mine.",
    "I want a tooth for a tooth, I want an eye for an eye.",
    "I need a head I can hold up, I need the nickel and iron.",
    "By pulling me down, pulling me down, burn me to the ground.",
    `I hear it from no one,
    It occur to me the old world,
    It may have said no word,
    But I have to keep knowing.`,
    "All I see is illusion it’s all illusion it’s all illusion. All I am is illusion it’s all illusion it’s all illusion.",
    "I’ve seen the highest high when I’m down in the lowest low.",
    "I’m out of sight in the darkest night, where my faith is overthrown, but I won’t let it reign over my mind.",
    "I’m due for a miracle",
    "I TAKE ALL YOUR DEEP CUTS I TAKE IT ALL."
    "So give me a reason, to prove me wrong, to wash this memory clean."
    "Mission sub rosa, concealed en umbra."
];

// 随机显示句子的函数
function displayRandomQuote() {
    console.log("displayRandomQuote 已执行");
    const randomIndex = Math.floor(Math.random() * quotes.length); // 随机选择索引
    const randomQuote = quotes[randomIndex]; // 取出随机句子
    console.log("randomQuote:", quotes[randomIndex]);
    document.getElementById("random-quote").innerText = randomQuote;
}
