const views = ["view-search", "view-loading", "view-result", "view-detail"];

function showView(viewId) {
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === viewId) ? "block" : "none";
    }
  });
}


const AppState = {
  recipes: [],
  selectedRecipe: null
};


// function loadRecipes() {
//   return fetch('recipes.json')
//     .then(res => {
//       if (!res.ok) throw new Error("読み込み失敗");
//       return res.json();
//     });
// }

// fetch の代わりにこれを使う
function loadRecipes() {
  return Promise.resolve(window.recipesData);
}

function renderResults(recipes) {
  const container = document.getElementById("result-list");
  container.innerHTML = ""; // 既存の内容をクリア

  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
    `;

    card.addEventListener("click", () => {
      AppState.selectedRecipe = recipe;
      showView("view-detail");
      renderDetail(recipe);
    });

    container.appendChild(card);
  });
}


//----------------------------------------------------//
function requestAPI(keyword) {
  console.log("検索キーワード:", keyword);  // OK
  showView("view-loading");

  // 検索中っぽいディレイを入れてから実行（仮AI処理）
  setTimeout(() => {
    responseAPI(keyword);
  }, 3000);
}

//----------------------------------------------------//
function responseAPI() {
  showView("view-result");

  loadRecipes()
    .then(recipes => {
      AppState.recipes = recipes;
      renderResults(recipes);
    })
    .catch(err => {
      console.error("レシピ読み込みエラー:", err);
    });
}

//----------------------------------------------------//






// 画面を読み込んだ時の初回の処理
document.addEventListener("DOMContentLoaded", () => {

    // はじめは検索画面を表示
    showView("view-search");

    // 今日のおすすめを読み込む
    // fetch('./recommendation.json')
    //     .then(response => {
    //     if (!response.ok) throw new Error("データの読み込みに失敗しました");
    //     return response.json();
    //     })
    //     .then(data => {
    //     const dateHeading = document.querySelector('.recommendation-date h3');
    //     const description = document.querySelector('.recommendation-content p');
    //     const image = document.querySelector('.recommendation-image img');

    //     if (dateHeading) {
    //         dateHeading.textContent = `${data.date}のおすすめ`;
    //     }
    //     if (description) {
    //         description.textContent = data.description;
    //     }
    //     if (image) {
    //         image.src = data.image;
    //         image.alt = `${data.title}の画像`;
    //     }
    //     })
    //     .catch(error => {
    //     console.error("おすすめセクションの読み込みエラー:", error);
    //     });

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




//----------------------------------------------------//
    const searchBtn = document.querySelector(".search-button");
    const input = document.querySelector(".search-input");

    searchBtn.addEventListener("click", () => {
        const keyword = input.value.trim();
        requestAPI(keyword);
     });  
//----------------------------------------------------//

});


