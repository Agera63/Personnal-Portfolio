const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    status.textContent = "Sending...";

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            status.textContent = "Thanks! Your message has been sent.";
            form.reset();
        } else {
            const result = await response.json().catch(() => null);
            if (result && result.errors) {
                status.textContent = "Oops! " + result.errors.map(err => err.message).join(", ");
            } else {
                status.textContent = "Oops! Something went wrong. Please try again.";
            }
        }
    } catch (error) {
        status.textContent = "Oops! Something went wrong. Please try again.";
    }
});