
/* ============================================================
   1. SELECT ELEMENTS
============================================================ */

const themeToggle =
    document.getElementById("theme-toggle");

const impactForm =
    document.getElementById("impact-form");

const scoreElement =
    document.getElementById("score");

const scoreCircle =
    document.querySelector(".score-circle");

const scoreStatus =
    document.getElementById("score-status");

const scoreMessage =
    document.getElementById("score-message");

const biggestOpportunity =
    document.getElementById("biggest-opportunity");

const transportProgress =
    document.getElementById("transport-progress");

const energyProgress =
    document.getElementById("energy-progress");

const foodProgress =
    document.getElementById("food-progress");

const wasteProgress =
    document.getElementById("waste-progress");

const transportValue =
    document.getElementById("transport-value");

const energyValue =
    document.getElementById("energy-value");

const foodValue =
    document.getElementById("food-value");

const wasteValue =
    document.getElementById("waste-value");


/* ============================================================
   2. DARK MODE
============================================================ */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    const darkModeEnabled =
        document.body.classList.contains("dark-mode");


    if (darkModeEnabled) {

        themeToggle.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        localStorage.setItem(
            "ecoTrackTheme",
            "dark"
        );

    } else {

        themeToggle.textContent = "☼";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        localStorage.setItem(
            "ecoTrackTheme",
            "light"
        );

    }

});


/* ============================================================
   3. LOAD SAVED THEME
============================================================ */

const savedTheme =
    localStorage.getItem("ecoTrackTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );

}


/* ============================================================
   4. IMPACT CALCULATOR
============================================================ */

impactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* -----------------------------------------
       Get form values
    ----------------------------------------- */

    const carTrips =
        Number(
            document.getElementById("car-trips").value
        );


    const publicTransport =
        Number(
            document.getElementById("public-transport").value
        );


    const energyUsage =
        document.getElementById("energy-usage").value;


    const meatMeals =
        Number(
            document.getElementById("meat-meals").value
        );


    const recycling =
        document.getElementById("recycling").value;


    /* -----------------------------------------
       Calculate category scores

       Higher score = better sustainability
    ----------------------------------------- */


    let transportScore =
        100 - (carTrips * 4);


    transportScore +=
        publicTransport * 2;


    transportScore =
        Math.max(
            0,
            Math.min(
                100,
                transportScore
            )
        );


    /* -----------------------------------------
       Energy
    ----------------------------------------- */

    let energyScore;


    if (energyUsage === "low") {

        energyScore = 90;

    } else if (energyUsage === "medium") {

        energyScore = 65;

    } else {

        energyScore = 40;

    }


    /* -----------------------------------------
       Food
    ----------------------------------------- */

    let foodScore =
        100 - (meatMeals * 7);


    foodScore =
        Math.max(
            0,
            Math.min(
                100,
                foodScore
            )
        );


    /* -----------------------------------------
       Waste
    ----------------------------------------- */

    let wasteScore;


    if (recycling === "always") {

        wasteScore = 95;

    } else if (recycling === "often") {

        wasteScore = 80;

    } else if (recycling === "sometimes") {

        wasteScore = 60;

    } else {

        wasteScore = 30;

    }


    /* -----------------------------------------
       Overall score
    ----------------------------------------- */

    const overallScore =
        Math.round(
            (
                transportScore +
                energyScore +
                foodScore +
                wasteScore
            ) / 4
        );


    /* -----------------------------------------
       Update main score
    ----------------------------------------- */

    scoreElement.textContent =
        overallScore;

     /* -----------------------------------------
    Update score circle color----------------------------------- */

    scoreCircle.classList.remove(
        "score-low",
        "score-medium",
        "score-good",
        "score-excellent"
    );

    if (overallScore < 40) {

        scoreCircle.classList.add("score-low");

    } else if (overallScore < 60) {

        scoreCircle.classList.add("score-medium");

    } else if (overallScore < 80) {

        scoreCircle.classList.add("score-good");

    } else {

        scoreCircle.classList.add("score-excellent");

    }
    /* -----------------------------------------
       Determine status
    ----------------------------------------- */

    if (overallScore >= 80) {

        scoreStatus.textContent =
            "Excellent";

        scoreMessage.textContent =
            "Your lifestyle choices are creating a relatively low environmental impact. Keep going!";

    } else if (overallScore >= 60) {

        scoreStatus.textContent =
            "Good";

        scoreMessage.textContent =
            "You're doing better than average, but there are opportunities to improve.";

    } else if (overallScore >= 40) {

        scoreStatus.textContent =
            "Fair";

        scoreMessage.textContent =
            "You have some positive habits, but several areas could be improved.";

    } else {

        scoreStatus.textContent =
            "Needs improvement";

        scoreMessage.textContent =
            "There are several opportunities to make your lifestyle more sustainable.";

    }


    /* -----------------------------------------
       Update breakdown
    ----------------------------------------- */

    transportProgress.value =
        transportScore;

    energyProgress.value =
        energyScore;

    foodProgress.value =
        foodScore;

    wasteProgress.value =
        wasteScore;


    transportValue.textContent =
        `${Math.round(transportScore)}%`;

    energyValue.textContent =
        `${Math.round(energyScore)}%`;

    foodValue.textContent =
        `${Math.round(foodScore)}%`;

    wasteValue.textContent =
        `${Math.round(wasteScore)}%`;


    /* -----------------------------------------
       Find weakest category
    ----------------------------------------- */

    const categoryScores = {

        Transportation: transportScore,

        Energy: energyScore,

        Food: foodScore,

        Waste: wasteScore

    };


    let weakestCategory =
        "Transportation";


    for (
        const category in categoryScores
    ) {

        if (
            categoryScores[category] <
            categoryScores[weakestCategory]
        ) {

            weakestCategory =
                category;

        }

    }


    biggestOpportunity.textContent =
        weakestCategory;


    /* -----------------------------------------
       Opportunity message
    ----------------------------------------- */

    const opportunityCard =
        document.querySelector(
            ".opportunity-card div p:last-child"
        );


    if (weakestCategory === "Transportation") {

        opportunityCard.textContent =
            "Try replacing two car trips with public transport this week.";

    } else if (weakestCategory === "Energy") {

        opportunityCard.textContent =
            "Try reducing unnecessary electricity use and switching to efficient lighting.";

    } else if (weakestCategory === "Food") {

        opportunityCard.textContent =
            "Try replacing one or two meat meals with plant-based alternatives.";

    } else {

        opportunityCard.textContent =
            "Try increasing recycling and replacing disposable products with reusable alternatives.";

    }

});


/* ============================================================
   5. SMOOTH NAVIGATION
============================================================ */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                link.getAttribute("href");


            if (
                targetId === "#" ||
                targetId === ""
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* ============================================================
   6. FAQ
============================================================ */

const faqItems =
    document.querySelectorAll(
        ".faq-list details"
    );


faqItems.forEach(function (item) {

    item.addEventListener(
        "toggle",
        function () {

            if (!item.open) {

                return;

            }


            faqItems.forEach(function (otherItem) {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {

                    otherItem.open = false;

                }

            });

        }
    );

});