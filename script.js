//  API Key
const API_KEY = "3ucjztrJP48vTeOGwRUKeg==IDNpRpbcTEBgwkZ8";

// Function to analyze meal using Nutrition API
async function checkCalories() {
    const mealText = document.getElementById("meal").value.trim();
    if (!mealText) return alert("Please enter your meal!");

    const url = `https://api.calorieninjas.com/v1/nutrition?query=${mealText}`;

    let total = 0;

    try {
        const response = await fetch(url, {
            headers: { "X-Api-Key": API_KEY }
        });

        const data = await response.json();

        data.items.forEach(item => {
            total += item.calories || 0;
        });

    } catch (error) {
        alert("API issue, switching to mock mode.");
        total = mockCalories(mealText);
    }

    showResults(total);
}

// Simple fallback demo mode
function mockTest() {
    const meal = document.getElementById("meal").value;
    if (!meal) return alert("Enter your meal!");
    const calories = mockCalories(meal);
    showResults(calories);
}

// Mock logic
function mockCalories(meal) {
    const mockData = { egg: 80, banana: 100, rice: 200, apple: 90, paneer: 250 };
    let total = 0;

    Object.keys(mockData).forEach(food => {
        if (meal.toLowerCase().includes(food)) {
            total += mockData[food];
        }
    });

    return total || 150; // default
}

// Show results + advice
function showResults(total) {
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const activity = document.getElementById("activity").value;

    document.getElementById("calShow").innerHTML =
        `Your meal contains approx <b>${total}</b> calories.`;

    let advice = "Health Tip: ";

    if (age === "young") advice += "Young people need higher energy. ";
    if (age === "adult") advice += "Focus on balanced protein intake. ";
    if (age === "old") advice += "Choose lighter, easily digestible meals. ";

    if (gender === "male") advice += "Males burn calories faster. ";
    if (gender === "female") advice += "Females need consistent nutrition. ";

    if (activity === "low") advice += "Try taking a 10-minute walk.";
    if (activity === "medium") advice += "Good activity level, keep it up!";
    if (activity === "high") advice += "Your activity level is excellent!";

    document.getElementById("advice").innerHTML = advice;
    document.getElementById("result").classList.remove("hidden");
}