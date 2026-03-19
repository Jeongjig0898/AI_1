# Project Blueprint: Simple Word Translator

This document outlines the plan, features, and design for a simple, "Papago-style" word translator application.

## 1. Overview

The goal is to create a clean, single-page web application that allows a user to enter a word and see its "translation." Since we don't have access to a real translation API, the translation will be simulated using a predefined JavaScript dictionary.

## 2. Features

*   **Input Area:** A textarea where the user can type a word.
*   **Translate Button:** A button to trigger the translation.
*   **Output Area:** A section to display the translated word.
*   **Simple Dictionary:** A hardcoded list of Korean-to-English word pairs.
*   **Not Found Message:** A message to show if the word is not in the dictionary.

## 3. Design & Style

*   **Layout:** A centered, clean layout using modern CSS (Flexbox or Grid).
*   **Color Palette:** A simple and modern color scheme (e.g., light grays, a primary color for the button).
*   **Typography:** A clean, readable web font.
*   **UI Elements:**
    *   Input and output boxes will have rounded corners, padding, and subtle box shadows to look "lifted."
    *   The button will have a clear call-to-action style.
*   **Responsiveness:** The layout will be mobile-responsive, adapting to different screen sizes.

## 4. Current Task: Implementation Plan

1.  **[COMPLETED]** Create a `blueprint.md` file to outline the project's plan, features, and design.
2.  **[in_progress]** Create the basic HTML structure (`index.html`) with a textarea, a button, and a div for the output.
3.  **[pending]** Style the application (`style.css`) to match the design goals.
4.  **[pending]** Implement the translation logic (`main.js`) with a simple dictionary and event listeners.
