const form = document.querySelector("#waitlist");
const message = document.querySelector("#form-message");
const submitButton = form.querySelector('button[type="submit"]');
const defaultButtonText = submitButton.innerHTML;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.dataset.state = "";

  const endpoint = document.documentElement.dataset.waitlistEndpoint.trim();
  if (!endpoint) {
    message.textContent = "Waitlist signup isn't connected yet. Please check back soon.";
    message.dataset.state = "error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Joining...";
  form.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Waitlist request failed with status ${response.status}.`);
    }

    form.reset();
    message.textContent = "You're on the list. Watch your inbox for launch news.";
  } catch (error) {
    console.error("Waitlist submission failed.", error);
    message.textContent = "We couldn't submit your signup. Please try again later.";
    message.dataset.state = "error";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = defaultButtonText;
    form.removeAttribute("aria-busy");
  }
});
