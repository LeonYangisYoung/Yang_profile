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
    "By pulling me down, pulling me down. Burn me to the ground.",
    "I hear it from no one,
    It occur to me the old world,
    It may have said no word,
    But I have to keep knowing."
     "All I see is illusion it’s all illusion it’s all illusion
     All I am is illusion it’s all illusion it’s all illusion"
"I’ve seen the highest high
When I’m down in the lowest low"
     "I’m out of sight in the darkest night,
Where my faith is overthrown,
But I won’t let it reign over my mind."
     "I’m due for a miracle"
];

// 随机显示句子的函数
function displayRandomQuote() {
     console.log("displayRandomQuote 已执行");
    const randomIndex = Math.floor(Math.random() * quotes.length); // 随机选择索引
    const randomQuote = quotes[randomIndex]; // 取出随机句子
    document.getElementById("random-quote").innerText = randomQuote;
}
