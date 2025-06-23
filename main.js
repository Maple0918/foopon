// 画面を読み込んだ時の初回の処理
document.addEventListener("DOMContentLoaded", () => {
    const data = window.recommendationData;

    const dateHeading = document.querySelector('.recommendation-date h3');
    const description = document.querySelector('.recommendation-content p');
    const image = document.querySelector('.recommendation-image img');

    if (dateHeading) {
        dateHeading.textContent = `${data.date}のおすすめ`;
    }
    if (description) {
        description.textContent = data.description;
    }
    if (image) {
        image.src = data.image;
        image.alt = `${data.title}の画像`;
    }
});