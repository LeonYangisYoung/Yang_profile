// scripts.java

// 示例功能：当页面加载时，显示一个欢迎提示
window.onload = function() {
    alert("欢迎来到杨的个人网站！网站依旧在开发中，不代表最终品质。");
};

    displayRandomQuote();
};

function displayRandomQuote() {
const quotes = [
    "I’ve become your shadow, your misery was mine",
    
    "I want a tooth for a tooth
    I want an eye for an eye",
    
    "I need a head I can hold up
    I need the nickel and iron",
        
    "By pulling me down, pulling me down
    Burn me to the ground.",
        
    "I hear it from no one,
    It occur to me the old world,
    It may have said no word,
    But I have to keep knowing."
        
];

// 随机显示句子的函数

    const randomIndex = Math.floor(Math.random() * quotes.length); // 随机选择索引
    const randomQuote = quotes[randomIndex]; // 取出随机句子
    document.getElementById("random-quote").innerText = randomQuote;
}
