import openpyxl
from urllib.parse import quote
import webbrowser
from time import sleep
import pyautogui
import sys
import os

arquivo_excel = sys.argv[1]
message_file  = sys.argv[2]

webbrowser.open('https://web.whatsapp.com/')
sleep(30)

with open(message_file, 'r', encoding='utf-8') as f:
    message = f.read()

try:
    os.remove(message_file)
except OSError:
    pass

workbook     = openpyxl.load_workbook(arquivo_excel)
clients_page = workbook['Página1']

for row in clients_page.iter_rows(min_row=2):
    phone = row[0].value

    if not phone:
        continue

    whatsapp_link = (
        f'https://web.whatsapp.com/send?phone={phone}'
        f'&text={quote(message)}'
    )
    webbrowser.open(whatsapp_link)
    sleep(20)
    pyautogui.press('enter')
    sleep(5)
    pyautogui.hotkey('ctrl', 'w')
    sleep(3)
