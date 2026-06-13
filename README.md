# WhatsApp Sender

Aplicação desktop para envio automatizado de mensagens via WhatsApp Web para múltiplos contatos a partir de uma planilha Excel.

---

## Sobre o Projeto

O **WhatsApp Sender** é uma ferramenta desktop construída com **Electron** (interface gráfica) e **Python** (automação de envio). Ela permite que o usuário importe uma lista de contatos via planilha `.xlsx`, escreva uma mensagem personalizada e dispare o envio automaticamente para todos os números listados usando o WhatsApp Web.

---

## Como Funciona

1. O usuário abre a aplicação Electron (interface gráfica).
2. Seleciona a planilha Excel com os contatos.
3. Digita a mensagem que deseja enviar.
4. Clica em enviar — a aplicação chama o script Python em segundo plano.
5. O script Python abre o WhatsApp Web para cada contato, aguarda o carregamento e pressiona Enter para enviar a mensagem.

---

## Estrutura do Projeto

```
WhatsappSender/
├── assets/          # Ícones e recursos visuais
├── css/             # Estilos da interface
├── views/           # Telas HTML da aplicação Electron
├── main.js          # Processo principal do Electron
├── preload.js       # Script de pré-carregamento do Electron
├── python.py        # Script de automação de envio via WhatsApp Web
├── package.json     # Dependências e configuração do Node.js
└── requirements.txt # Dependências Python
```

---

## Pré-requisitos

Certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Python](https://www.python.org/) (v3.8 ou superior)
- [Google Chrome](https://www.google.com/chrome/) (necessário para o WhatsApp Web)
- Uma conta WhatsApp ativa

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/natapereirax-cmd/WhatsappSender.git
cd WhatsappSender
```

### 2. Instale as dependências Node.js

```bash
npm install
```

### 3. Instale as dependências Python

```bash
pip install -r requirements.txt
```

---

## Formato da Planilha Excel

A planilha deve seguir exatamente este padrão para que o script funcione corretamente:
 
- O arquivo deve ser `.xlsx`
- A aba (sheet) deve se chamar **`Página1`**
- Os dados começam na **linha 2** (linha 1 é o cabeçalho)
- **Coluna A** → Número do telefone
### Exemplo:
 
| Telefone       |
|----------------|
| 5583991234567  |
| 5511987654321  |
 
> ⚠️ **Formato do número:** `55` + DDD (2 dígitos) + número (9 dígitos)  
> Exemplo: `5583991234567` → Brasil (55) + DDD 83 + 991234567
 
---

---

## Como Usar

### Iniciar a aplicação

```bash
npm start
```

A interface gráfica será aberta. A partir dela:

1. **Selecione o arquivo Excel** com os contatos.
2. **Digite a mensagem** que deseja enviar.
3. Clique em **Enviar** e aguarde.

> 💡 O WhatsApp Web será aberto no navegador. Na **primeira execução**, você precisará escanear o QR Code com seu celular para autenticar.

### O que acontece durante o envio:

- Para cada contato, o navegador abre o WhatsApp Web com o link de envio direto.
- O script aguarda **20 segundos** para o carregamento da página.
- A mensagem é enviada automaticamente (tecla Enter).
- O script aguarda **5 segundos** e fecha a aba.
- Repete o processo para o próximo contato.

---

## Tecnologias Utilizadas

| Tecnologia   | Função                                      |
|--------------|---------------------------------------------|
| Electron     | Interface gráfica desktop                   |
| Python       | Automação de envio via WhatsApp Web         |
| openpyxl     | Leitura da planilha Excel                   |
| pyautogui    | Simulação de teclas (Enter, Ctrl+W)         |
| webbrowser   | Abertura do WhatsApp Web no navegador       |

---

## ⚠️ Observações Importantes

- **Não feche o navegador** durante o envio — ele é necessário para a automação.
- Mantenha a tela do computador **ativa** (sem protetor de tela ou bloqueio), pois o `pyautogui` simula entradas no teclado.
- O tempo de espera entre os envios (20s) pode ser ajustado no arquivo `python.py`, dependendo da velocidade da sua internet.
- O uso de automações no WhatsApp pode violar os [Termos de Serviço do WhatsApp](https://www.whatsapp.com/legal/terms-of-service). Use com responsabilidade.

---


## Licença

Este projeto está sob a licença ISC. Consulte o arquivo `package.json` para mais detalhes.
