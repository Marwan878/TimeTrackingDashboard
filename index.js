const main = document.querySelector("main");

async function generateData(basis) {
    main.innerHTML = "";
    const url = "./data.json";
    const response = await fetch(url);
    const data = await response.json();
    ///
    // Create section element
    const section = document.createElement('section');
    section.className = 'master';

    // Create user-data div
    const userDataDiv = document.createElement('div');
    userDataDiv.className = 'user-data';

    // Create and append img element
    const img = document.createElement('img');
    img.src = './images/image-jeremy.png';
    img.alt = '';
    userDataDiv.appendChild(img);

    // Create user-name div
    const userNameDiv = document.createElement('div');
    userNameDiv.className = 'user-name';

    // Create and append p element
    const p = document.createElement('p');
    p.textContent = 'Report for';
    userNameDiv.appendChild(p);

    // Create and append h1 element
    const h1 = document.createElement('h1');
    h1.textContent = 'Jeremy Robson';
    userNameDiv.appendChild(h1);

    // Append user-name div to user-data div
    userDataDiv.appendChild(userNameDiv);

    // Append user-data div to section
    section.appendChild(userDataDiv);

    // Create basis-select div
    const basisSelectDiv = document.createElement('div');
    basisSelectDiv.className = 'basis-select';

    // Create and append buttons
    const dailyButton = document.createElement('button');
    dailyButton.setAttribute('data-basis', 'daily');
    dailyButton.textContent = 'Daily';
    basisSelectDiv.appendChild(dailyButton);

    const weeklyButton = document.createElement('button');
    weeklyButton.setAttribute('data-basis', 'weekly');
    weeklyButton.className = 'active';
    weeklyButton.textContent = 'Weekly';
    basisSelectDiv.appendChild(weeklyButton);

    const monthlyButton = document.createElement('button');
    monthlyButton.setAttribute('data-basis', 'monthly');
    monthlyButton.textContent = 'Monthly';
    basisSelectDiv.appendChild(monthlyButton);

    // Append basis-select div to section
    section.appendChild(basisSelectDiv);

    // Append section to the body or another container element in your HTML
    main.appendChild(section);

    ///
    const basisBtns = document.querySelectorAll("main .master .basis-select button");
    basisBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            generateData(btn.getAttribute("data-basis").toLowerCase());
        })
    });
    for(let i = 0; i < data.length; i++) {
        const section = document.createElement("section");
        section.classList.add("track");
        const backDiv = document.createElement("div");
        backDiv.classList.add("back");
        const backImg = document.createElement("img");
        backImg.setAttribute("src", data[i]["img"]);
        const upperDiv = document.createElement("div");
        upperDiv.classList.add("upper");
        const title = document.createElement("h3");
        title.appendChild(document.createTextNode(data[i]["title"]));
        const btn = document.createElement("button");
        const btnCircles = document.createElement("img");
        btnCircles.setAttribute("src", "./images/icon-ellipsis.svg");
        btn.addEventListener("click", () => {
        });
        const lowerDiv = document.createElement("div");
        lowerDiv.classList.add("lower");
        const currentProgress = document.createElement("h4");
        currentProgress.appendChild(document.createTextNode(data[i]["timeframes"][basis]["current"]));
        const previousProgress = document.createElement("p");
        let phrase = `Last ${basis.substring(0, 1).toUpperCase()}${basis.substring(1, basis.length - 2)}`;
        if(basis === "daily") {
            phrase = "Yesterday";
        }
        const prevText = document.createTextNode(`${phrase} - ${data[i]["timeframes"][basis]["previous"]}`);
        previousProgress.appendChild(prevText);
        backDiv.style.backgroundColor = data[i]["color"]
        main.appendChild(section);
        section.appendChild(backDiv);
        section.appendChild(upperDiv);
        section.appendChild(lowerDiv);
        backDiv.appendChild(backImg);
        upperDiv.appendChild(title);
        upperDiv.appendChild(btn);
        btn.appendChild(btnCircles)
        lowerDiv.appendChild(currentProgress);
        lowerDiv.appendChild(previousProgress);
    }
    changeColor(basis);
}
generateData("weekly");

function changeColor(basis) {
    const basisBtns = document.querySelectorAll("main .master .basis-select button");
    basisBtns.forEach(btn => {
        btn.classList.remove("active");
        if(basis === btn.getAttribute("data-basis")) {
            btn.classList.add("active")
        }
    });
}