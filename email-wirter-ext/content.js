console.log("Email Writer Loaded");

function getEmailContent() {
  const emailBody = document.querySelector(".a3s.aiL");

  if (!emailBody) {
    return "";
  }

  return emailBody.innerText.replace(/\s+/g, " ").trim().substring(0, 4000);
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);

    if (toolbar) {
      return toolbar;
    }
  }

  return null;
}

function findComposeBox() {
  const selectors = [
    '[contenteditable="true"][role="textbox"]',
    'div[aria-label="Message Body"]',
    ".Am.Al.editable",
    '.editable[contenteditable="true"]',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element) {
      return element;
    }
  }

  return null;
}

function createAIButton() {
  const button = document.createElement("div");

  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";

  button.classList.add("ai-reply-button");

  button.style.marginRight = "8px";
  button.style.cursor = "pointer";

  button.innerHTML = "AI Reply";

  button.setAttribute("role", "button");

  button.setAttribute("data-tooltip", "Generate AI Reply");

  return button;
}

async function generateAIReply(button) {
  try {
    button.innerHTML = "Generating...";
    button.style.pointerEvents = "none";
    button.style.opacity = "0.6";

    const emailContent = getEmailContent();

    console.log("Email Content:");
    console.log(emailContent);

    if (!emailContent) {
      alert("No email content found");

      return;
    }

    const response = await fetch("http://localhost:8080/api/email/generate", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        emailContent: emailContent,
        tone: "professional",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Backend Error:", errorText);

      throw new Error(errorText);
    }

    const generatedReply = await response.text();

    console.log("Generated Reply:");
    console.log(generatedReply);

    const composeBox = findComposeBox();

    if (!composeBox) {
      console.log("Compose box not found");

      return;
    }

    composeBox.focus();

    composeBox.innerHTML = "";

    const lines = generatedReply.split("\n");

    lines.forEach((line) => {
      const div = document.createElement("div");

      div.textContent = line || "\u00A0";

      composeBox.appendChild(div);
    });
  } catch (error) {
    console.error("Error generating reply:", error);
  } finally {
    button.innerHTML = "AI Reply";

    button.style.pointerEvents = "auto";

    button.style.opacity = "1";
  }
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");

  if (existingButton) {
    return;
  }

  const toolbar = findComposeToolbar();

  if (!toolbar) {
    console.log("Toolbar not found");

    return;
  }

  console.log("Toolbar found");

  const button = createAIButton();

  button.addEventListener("click", async () => {
    await generateAIReply(button);
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);

    const hasComposeElement = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]')),
    );

    if (hasComposeElement) {
      console.log("Compose window detected");

      setTimeout(() => {
        injectButton();
      }, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
