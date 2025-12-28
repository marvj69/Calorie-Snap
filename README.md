# Calorie-Snap

Calorie-Snap is a lightweight, mobile-friendly web app that estimates calories from food photos using an OpenRouter vision model. Upload or snap a meal photo, optionally add a note for context, and the app will return a total calorie estimate with an itemized breakdown. You can save meals locally for quick reference and export your history when needed.

## Features
- **Photo-based calorie estimates** powered by OpenRouter (default model: `google/gemini-3-flash-preview`).
- **Optional meal notes** to give the AI extra context.
- **Saved meals drawer** grouped by day with totals, item breakdowns, and per-meal details.
- **Local-first storage**: API key and saved meals are kept in your browser; no backend required.
- **Progressive Web App** touches like offline shell via a service worker and iOS-friendly UI styling.

## Getting Started
1. **Obtain an OpenRouter API key** from [openrouter.ai](https://openrouter.ai/).
2. **Open the app** (`index.html`) in a modern browser. You can double-click the file locally or serve it from any static host.
3. **Add your API key** via the Settings button (gear icon). The key is stored in `localStorage` on your device.
4. **Upload or take a photo** of your meal and optionally enter a brief note.
5. **Tap “Calculate Calories”** to send the image and note to OpenRouter and view the AI-generated totals and breakdown.
6. **Save meals** to keep a local history or **export** them as a JSON file from the Saved Meals drawer.

## Notes
- Images are resized client-side (max ~800px) before being sent to the API to reduce payload size.
- To change the OpenRouter model, update the `model` value in `index.html` inside the `fetch` call.
- If the service worker fails to register (e.g., when opening the file directly), you can still use the app; offline caching simply won’t be available.

## License
MIT
