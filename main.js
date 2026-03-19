const inputText = document.getElementById('input-text');
const translateBtn = document.getElementById('translate-btn');
const outputText = document.getElementById('output-text');

// Simple dictionary (Korean to English)
const dictionary = {
  "안녕하세요": "Hello",
  "감사합니다": "Thank you",
  "사랑해": "I love you",
  "바나나": "Banana",
  "사과": "Apple",
  "집": "House",
  "학교": "School",
  "강아지": "Dog",
  "고양이": "Cat",
  "책": "Book"
};

translateBtn.addEventListener('click', () => {
  const textToTranslate = inputText.value.trim();
  
  if (textToTranslate === "") {
    outputText.textContent = "";
    return;
  }

  const translation = dictionary[textToTranslate];

  if (translation) {
    outputText.textContent = translation;
  } else {
    outputText.textContent = "Word not found in dictionary.";
  }
});