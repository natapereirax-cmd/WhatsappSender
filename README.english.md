# WhatsApp Sender

Desktop application for automated message sending via WhatsApp Web to multiple contacts from an Excel spreadsheet.

## About the Project

WhatsApp Sender is a desktop tool built with Electron (graphical interface) and Python (sending automation). It allows the user to import a contact list via an `.xlsx` spreadsheet, write a custom message, and automatically send it to all listed numbers using WhatsApp Web.

## How It Works

1. The user opens the Electron application (graphical interface).
2. Selects the Excel spreadsheet with the contacts.
3. Types the message to be sent.
4. Clicks Send — the application calls the Python script in the background.
5. The Python script opens WhatsApp Web for each contact, waits for the page to load, and presses Enter to send the message.

## Project Structure

```
WhatsappSender/
├── assets/          # Icons and visual resources
├── css/             # Interface styles
├── views/           # HTML screens of the Electron application
├── main.js          # Electron main process
├── preload.js       # Electron preload script
├── python.py        # WhatsApp Web sending automation script
├── package.json     # Node.js dependencies and configuration
└── requirements.txt # Python dependencies
```

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Google Chrome (required for WhatsApp Web)
- An active WhatsApp account

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/natapereirax-cmd/WhatsappSender.git
cd WhatsappSender
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

## Excel Spreadsheet Format

The spreadsheet must follow this exact format for the script to work correctly:

- The file must be `.xlsx`
- The sheet must be named `Página1`
- Data starts on row 2 (row 1 is the header)
- Column A → Phone number

**Example:**

| Phone |
|-------|
| 5583991234567 |
| 5511987654321 |

> ⚠️ **Number format:** 55 + area code (2 digits) + number (9 digits)  
> Example: `5583991234567` → Brazil (55) + area code 83 + 991234567

## How to Use

### Start the application

```bash
npm start
```

The graphical interface will open. From there:

1. Select the Excel file with the contacts.
2. Type the message you want to send.
3. Click **Send** and wait.

> 💡 WhatsApp Web will open in the browser. On the first run, you will need to scan the QR Code with your phone to authenticate.

### What happens during sending:

- For each contact, the browser opens WhatsApp Web with a direct send link.
- The script waits 20 seconds for the page to load.
- The message is sent automatically (Enter key).
- The script waits 5 seconds and closes the tab.
- The process repeats for the next contact.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Electron | Desktop graphical interface |
| Python | WhatsApp Web sending automation |
| openpyxl | Excel spreadsheet reading |
| pyautogui | Key simulation (Enter, Ctrl+W) |
| webbrowser | Opening WhatsApp Web in the browser |

## ⚠️ Important Notes

- **Do not close the browser during sending** — it is required for the automation.
- **Keep the screen active** (no screensaver or lock screen), as pyautogui simulates keyboard input.
- The wait time between sends (20s) can be adjusted in `python.py` depending on your internet speed.
- The use of automation on WhatsApp may violate WhatsApp's Terms of Service. Use responsibly.

## License

This project is licensed under the ISC license. See the `package.json` file for more details.
