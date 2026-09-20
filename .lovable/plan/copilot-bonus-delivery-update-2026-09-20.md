# Copilot bonus delivery update

## What will change
- Replace the six generated text downloads with the six uploaded PDF files.
- Make each bonus card download its matching PDF.
- Change the Copilot form's successful submission state to confirm the bonus pack is being sent by email and remind readers to check spam or promotions.
- Repair “Or skip ahead to the files” so it reliably opens the Copilot resource library.
- Preserve the existing Claude Advantage page and its signup flow unchanged.

## Verification
- Test the Copilot signup success state and both resource-library links.
- Download every PDF and confirm the file opens and matches its bonus title.
- Check the Copilot pages at desktop and mobile sizes and confirm the preview builds without errors.

## Technical details
- Store the uploaded PDFs through the project asset service and reference their versioned URLs in the Copilot bonus data.
- Keep Brevo list 7 and the existing secure server-side signup request unchanged.
