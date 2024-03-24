const puppeteer = require("puppeteer");

const getSymptoms = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto("https://www.nhs.uk/conditions/", {
        waitUntil: "domcontentloaded",
    });
    let text = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".nhsuk-list li a"), (element) => {
            const content = element.textContent.replace("\n", "").trim();
            if (content.length > 1) return content;
        })
    );
    text = text.filter((element) => element != null);
    text.forEach((element, index, array) => {
        const seeIndex = element.indexOf(", see ");
        if (seeIndex > -1) {
            array[index] = element.substring(0, seeIndex);
        }
    });
    return text;
};

module.exports = getSymptoms;
